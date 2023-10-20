const express = require('express');
const cors = require('cors');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const multer = require('multer');
const mime = require('mime-types');
const PDFParser = require('pdf-parse');
require('dotenv').config();
const port = process.env.DB_PORT;
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sanitizeHtml = require('sanitize-html');

const { sanitizeAndValidate, sanitizeAndValidateArray } = require('./utils/validator and sanitizer/ValidatorAndSanitizer');
const db = require('./utils/database/DatabaseConnection'); // database
const { verifyToken } = require('./utils/auth/AuthVerify'); // verify token
const getCurrentFormattedDate = require('./utils/current date/CurrentData');

// import document Scanner
const { processFile } = require('./utils/scan document/ScanDocument');
// import naive bayes
const { createChatbot } = require('./utils/scan document/NaiveBayes');
// import double hashing
const { createHashTable } = require('./utils/scan document/DoubleHashing');
// import bad words
const { BadWords } = require('./utils/scan document/BadWords');

const app = express();

app.use(express.json());
app.use(cors({
    origin: [`${process.env.FE_LINK}`],
    methods: ['POST', 'GET'],
    credentials: true
}));

const secretKey = process.env.SECRET_KEY; // my secret key
const currentDate = getCurrentFormattedDate();

// ###################################################################################################################################################################################
// #####################################################################  CHAT REQUEST  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/chat-request', verifyToken, (req, res) => {
    const { userInput } = req.body;

    if (!userInput) {
        res.status(404).json('404');
    }

    const chatRequest = createChatbot();
    const badWords = BadWords();

    let isChatBotResponse = false;

    // check if the user input contains bad words
    const checkUserInput = badWords.map((item) => {
        const userInputArray = userInput.split(' ');

        const mapUserInput = userInputArray.map(userInputItem => {
            if (item.toLowerCase() === userInputItem.toLowerCase()) {
                isChatBotResponse = true;
            }
        });
    });

    if (isChatBotResponse) {
        res.status(200).json({ message: "Sorry, But I'm unable to provide or discuss content that includes inappropriate or offensive language." });
    } else {
        const chat = chatRequest(userInput);

        if (chat) {
            res.status(200).json({ message: chat });
        } else {
            res.status(403).json('403');
        }
    }

});

// ###################################################################################################################################################################################
// #####################################################################  SCAN DOCUMENT  ############################################################################################
// ###################################################################################################################################################################################
const documentUpload = multer({
    dest: 'assets/archive files/',
});

app.post('/api/scan-document', verifyToken, documentUpload.single('archiveFile'), (req, res) => {
    const originalFileName = req.file.originalname;

    const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
    const uniqueFilePath = `assets/archive files/${uniqueFileName}`;

    fs.rename(req.file.path, uniqueFilePath, (err) => {
        if (err) {
            res.status(401).json({ message: "Error moving the upload file!" });
        }

        else {
            const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
            if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                return res.status(401).send({ message: "Invalid File Name!" });
            }
            else {
                if (req.file.size > 5242880) {
                    res.status(401).json({ message: "File is too large!" });
                }
                else {
                    // Check if the uploaded file has a PDF or DOCX extension
                    const mimeType = mime.lookup(sanitizedFileName);
                    if (mimeType !== 'application/pdf') {
                        res.status(401).json({ message: "Invalid file type! Accepted file PDF and Docx extension." })
                    }
                    else {
                        let isFound = false;
                        let foundPage = 0, foundAbstract = '';

                        processFile(uniqueFilePath)
                            .then(pageTexts => {
                                pageTexts.forEach((pageText, pageNum) => {
                                    const pageNumber = pageNum;
                                    const contentEveryPage = pageText.replace(/\s+/g, ' ');

                                    if ((contentEveryPage).toLowerCase().includes("abstract")) {
                                        foundPage = pageNumber;
                                        foundAbstract = contentEveryPage;
                                        isFound = true;
                                        return;
                                    }
                                });

                                if (isFound) {
                                    const splitFoundAbstract = foundAbstract.split(/Abstract/i);
                                    // console.log("\n",splitFoundAbstract, foundPage);
                                    res.status(200).json({ foundAbstract: splitFoundAbstract[1], pageNumber: foundPage + 1, fileName: uniqueFilePath });
                                } else {
                                    // Remove the file
                                    fs.unlink(uniqueFilePath, (err) => {
                                        if (err) {
                                            console.error('Error deleting file:', err);
                                        }
                                    });
                                    res.status(401).json({ message: "There is no abstract found! Check your PDF file and upload again!" });
                                }
                            })
                            .catch(error => {
                                res.status(401).json({ message: "Something went wrong!" });
                                console.error('Error extracting text from PDF', error);
                            });
                    }
                }
            }
        }

    });
});

// ###################################################################################################################################################################################
// #####################################################################  PROTECTED SIDE  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/protected', verifyToken, (req, res) => {
    const { user } = req;

    res.status(200).json({ message: 'Success', user: user });
});

// require image folder
app.use('/assets', express.static('assets'));

// ###################################################################################################################################################################################
// #####################################################################  REGISTER SIDE  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/register', (req, res) => {
    const { registerData } = req.body;
    const givenImage = "assets/image upload/given image.png";

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const registerDataFirstName = sanitizeAndValidate(registerData.firstName, validationRules);
    const registerDataLastName = sanitizeAndValidate(registerData.lastName, validationRules);
    const registerDataUsername = sanitizeAndValidate(registerData.username, validationRules);
    const registerDataPassword = sanitizeAndValidate(registerData.password, validationRules);
    const registerDataConfirmPassword = sanitizeAndValidate(registerData.confirmPassword, validationRules);

    if (!registerDataFirstName || !registerDataLastName || !registerDataUsername || !registerDataPassword || !registerDataConfirmPassword) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check the password and confirm password if equal
        if (registerDataPassword === registerDataConfirmPassword) {
            // check the username length
            if (registerDataUsername.length >= 5) {
                // check the password length
                if (registerDataPassword.length >= 7) {
                    // check username if already exist on database!
                    const checkUsername = `SELECT * FROM users WHERE username = ? AND isDelete = ?`;
                    db.query(checkUsername, [registerDataUsername, "not"], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            if (results.length > 0) {
                                res.status(401).json({ message: "Username is already exist!" });
                            } else {
                                // hash the user password
                                const hashedPassword = crypto.createHash('sha256').update(registerDataPassword).digest('hex');

                                // register user
                                const register = `INSERT INTO users (first_name, middle_name, last_name, username, password, image, user_type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                                db.query(register, [registerDataFirstName, registerData.middleName, registerDataLastName, registerDataUsername, hashedPassword, givenImage, "Student"], (error, results) => {
                                    if (error) {
                                        res.status(401).json({ message: "Server side error!" });
                                    } else {
                                        // create token
                                        const fetchData = {
                                            id: results.insertId,
                                            username: registerDataUsername,
                                            firstName: registerDataFirstName,
                                            middleName: registerData.middleName,
                                            lastName: registerDataLastName,
                                            userType: "Student",
                                            image: givenImage
                                        };

                                        const token = jwt.sign(fetchData, secretKey); // set token no expiration

                                        res.status(200).json({ token: token });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    res.status(401).json({ message: "Password must have at least 7 characters!" });
                }
            } else {
                res.status(401).json({ message: "Username must have at least 5 characters!" });
            }
        } else {
            res.status(401).json({ message: "Password and confirm password is not equal!" });
        }
    }
});

// ###################################################################################################################################################################################
// #####################################################################  LOGIN SIDE  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const usernameSanitized = sanitizeAndValidate(username, validationRules);
    const passwordSanitized = sanitizeAndValidate(password, validationRules);

    if (!usernameSanitized || !passwordSanitized) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM users WHERE username = ?`;
        db.query(select, [usernameSanitized], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error" });
            } else {
                if (results.length > 0) {
                    const dbPassword = results[0].password;
                    const hashedPassword = crypto.createHash('sha256').update(passwordSanitized).digest('hex');

                    if (dbPassword === hashedPassword) {
                        const fetchData = {
                            id: results[0].id,
                            username: results[0].username,
                            firstName: results[0].first_name,
                            middleName: results[0].middle_name,
                            lastName: results[0].last_name,
                            userType: results[0].user_type,
                            image: results[0].image
                        };

                        const token = jwt.sign(fetchData, secretKey);

                        res.status(200).json({ token: token });
                    } else {
                        res.status(401).json({ message: "Invalid Password!" });
                    }
                }
                else {
                    res.status(401).json({ message: 'Invalid Username!' });
                }
            }
        });
    }
});

// ####################################################################################################################################################################################
// ###########################################################      SUBMIT THESIS AND CAPS      ###################################################################################
// ####################################################################################################################################################################################
const uploadBannerImage = multer({
    dest: 'assets/banner image/',
});

app.post('/api/submit-archive-file', verifyToken, uploadBannerImage.single('bannerImage'), (req, res) => {
    const { foundAbstract, pageNumber, fileName, department, course, schoolYear, projectTitle, members, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const submitFoundAbstract = sanitizeAndValidate(foundAbstract, validationRules);
    const submitPageNumber = sanitizeAndValidate(pageNumber, validationRules);
    const submitFileName = sanitizeAndValidate(fileName, validationRules);
    const submitDepartment = sanitizeAndValidate(department, validationRules);
    const submitCourse = sanitizeAndValidate(course, validationRules);
    const submitSchoolYear = sanitizeAndValidate(schoolYear, validationRules);
    const submitProjectTitle = sanitizeAndValidate(projectTitle, validationRules);
    const submitMembers = sanitizeAndValidate(members, validationRules);
    const sanitizeId = sanitizeAndValidate(userId, validationRules);

    if (!submitFoundAbstract || !submitPageNumber || !submitFileName || !submitDepartment || !submitCourse || !submitSchoolYear || !submitProjectTitle || !submitMembers || !sanitizeId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/banner image/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const insertNew = `INSERT INTO archive_files (abstract, page_number, file_path, department, course, school_year, project_title, members, image_banner, date) VALUES (?,?,?,?,?,?,?,?,?,?)`;
                        db.query(insertNew, [submitFoundAbstract, submitPageNumber, submitFileName, submitDepartment, submitCourse, submitSchoolYear, submitProjectTitle, submitMembers, uniqueFilePath, currentDate], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                // insert notification
                                const insertNotification = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ? ,?)`;
                                db.query(insertNotification, [sanitizeId, "Add Project", `You've successfully added ${submitProjectTitle} to archive`, currentDate], (error, results) => {
                                    if (error) {
                                        res.status(401).json({ message: "Server side error!" });
                                    } else {
                                        res.status(200).json({ message: `${submitProjectTitle} has been successfully added!` });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }

});

// ###################################################################################################################################################################################
// #####################################################################  FETCH ARCHIVE FILE  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-archive-files', verifyToken, (req, res) => {
    const getArchive = `SELECT * FROM archive_files WHERE isDelete = ?`;
    db.query(getArchive, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No Archive found!" });
            }
        }
    });
});

app.get('/api/admin-each-files/public/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const sanitizeId = sanitizeAndValidate(id, validationRules);

    if (!sanitizeId) {
        res.status(401).json({ message: "Something went wrong on project id!" });
    } else {
        const getArchive = `SELECT * FROM archive_files WHERE isDelete = ? AND id = ? AND status = ?`;
        db.query(getArchive, ["not", sanitizeId, "Published"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(200).json({ message: results });
                } else {
                    res.status(401).json({ message: "Something wrong on project id!" });
                }
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH ARCHIVE FILE FOR PUBLIC  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-archive-files/public', (req, res) => {
    const getArchive = `SELECT project_title, department, members, id, course, school_year, image_banner, abstract, date FROM archive_files WHERE isDelete = ? AND status = ?`;
    db.query(getArchive, ["not", "Published"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No Archive found!" });
            }
        }
    });
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH EACH ARCHIVE FILE  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-each-files/public/:id', (req, res) => {
    const { id } = req.params;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const sanitizeId = sanitizeAndValidate(id, validationRules);

    if (!sanitizeId) {
        res.status(401).json({ message: "Something went wrong on project id!" });
    } else {
        const getArchive = `SELECT project_title, department, members, id, course, school_year, image_banner, abstract, date FROM archive_files WHERE isDelete = ? AND id = ? AND status = ?`;
        db.query(getArchive, ["not", sanitizeId, "Published"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(200).json({ message: results });
                } else {
                    res.status(401).json({ message: "Something wrong on project id!" });
                }
            }
        });
    }
});

// // ###################################################################################################################################################################################
// // #####################################################################  EDIT ARCHIVE FILE  ############################################################################################
// // ###################################################################################################################################################################################
app.post('/api/edit-archive-file', verifyToken, (req, res) => {
    const { editArchiveData } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 100 } },
    ];

    const editId = (editArchiveData.id).toString();

    const editArchiveId = sanitizeAndValidate(editId, validationRules);
    const editArchiveStatus = sanitizeAndValidate(editArchiveData.status, validationRules);
    const editArchiveTitle = sanitizeAndValidate(editArchiveData.projectTitle, validationRules);

    if (!editArchiveId || !editArchiveStatus || !editArchiveTitle) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        // update
        const updateArchive = `UPDATE archive_files SET status = ? WHERE id = ?`;
        db.query(updateArchive, [editArchiveStatus, editArchiveId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                res.status(200).json({ message: `${editArchiveTitle} has been successfully updated!` });
            }
        });
    }
});

// // ###################################################################################################################################################################################
// // #####################################################################  DELETE CAPS AND THESIS  ############################################################################################
// // ###################################################################################################################################################################################
app.post('/api/delete-archive-file', verifyToken, (req, res) => {
    const { editArchiveData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 100 } },
    ];

    const editId = (editArchiveData.id).toString();

    const editArchiveId = sanitizeAndValidate(editId, validationRules);
    const editArchiveStatus = sanitizeAndValidate(editArchiveData.status, validationRules);
    const editArchiveTitle = sanitizeAndValidate(editArchiveData.projectTitle, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!editArchiveId || !editArchiveStatus || !editArchiveTitle || !sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        // delete
        const deleteArchive = `UPDATE archive_files SET isDelete = ? WHERE id =?`;
        db.query(deleteArchive, ["Deleted", editArchiveId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insertNot, [sanitizeUserId, "Delete Archive File", `You've successfully deleted the ${editArchiveTitle}`, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        // success
                        res.status(200).json({ message: `${editArchiveTitle} has been successfully deleted!` });
                    }
                });
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH USER DATA  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/fetch-user', verifyToken, (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const select = `SELECT * FROM users WHERE id = ? AND isDelete = ?`;
        db.query(select, [sanitizeUserId, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(200).json({ message: results });
                } else {
                    res.status(401).json({ message: "No user found!" });
                }
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  CHANGE PASSWORD SIDE  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/change-password', verifyToken, (req, res) => {
    const { changePass, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUsername = sanitizeAndValidate(changePass.username, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizePassword = sanitizeAndValidate(changePass.currentPassword, validationRules);
    const sanitizeNewPassword = sanitizeAndValidate(changePass.newPassword, validationRules);
    const sanitizeConfirmPassword = sanitizeAndValidate(changePass.confirmPassword, validationRules);

    if (!sanitizeUserId || !sanitizePassword || !sanitizeNewPassword || !sanitizeConfirmPassword || !sanitizeUsername) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        if (sanitizeUsername.length >= 5 && sanitizeUsername.length <= 20) {
            if (sanitizeNewPassword === sanitizeConfirmPassword) {
                if (sanitizeNewPassword.length >= 7 && sanitizeNewPassword.length <= 20) {
                    // select password
                    const select = `SELECT * FROM users WHERE id = ? AND isDelete = ?`;
                    db.query(select, [sanitizeUserId, 'not'], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            if (results.length > 0) {
                                // get db password
                                const dbPassword = results[0].password;
                                // const dbUsername = results[0].username;

                                // hash current password
                                const hashedPassword = crypto.createHash('sha256').update(sanitizePassword).digest('hex');
                                // hash new Password
                                const hashedNewPassword = crypto.createHash('sha256').update(sanitizeNewPassword).digest('hex');

                                // check the current password and new password
                                if (dbPassword === hashedPassword) {
                                    // update database
                                    const checkUsername = `SELECT * FROM users WHERE username = ? AND id != ?`;
                                    db.query(checkUsername, [sanitizeUsername, sanitizeUserId], (error, results) => {
                                        if (error) {
                                            res.status(401).json({ message: "Server side error!" });
                                        } else {
                                            if (results.length > 0) {
                                                res.status(401).json({ message: "Username already exist!" });
                                            } else {
                                                const update = `UPDATE users SET password = ? WHERE id = ?`;
                                                db.query(update, [hashedNewPassword, sanitizeUserId], (error, results) => {
                                                    if (error) {
                                                        res.status(401).json({ message: "Server side error!" });
                                                    } else {
                                                        res.status(200).json({ message: "User credentials updated successfully!" });
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    res.status(401).json({ message: "Invalid Current Password!" });
                                }
                            } else {
                                res.status(401).json({ message: "Something went wrong!" });
                            }
                        }
                    });
                } else {
                    res.status(401).json({ message: "New password must have 7 to 20 characters!" });
                }
            } else {
                res.status(401).json({ message: "New password and confirm password not match!" });
            }
        } else {
            res.status(401).json({ message: "Username must have 5 to 20 characters!" });
        }
    }
});

// ###################################################################################################################################################################################
// #####################################################################  AUTO IMAGE UPLOAD  ############################################################################################
// ###################################################################################################################################################################################
const imageUpload = multer({
    dest: 'assets/image upload/',
});

app.post('/api/auto-image-upload', verifyToken, imageUpload.single('image'), (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/image upload/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const insert = `UPDATE users SET image = ? WHERE id = ?`;
                        db.query(insert, [uniqueFilePath, sanitizeUserId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                res.status(200).json({ message: "Profile image changed!" });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH ALL USERS  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-users', verifyToken, (req, res) => {

    const fetchUser = `SELECT * FROM users WHERE isDelete = ?`;
    db.query(fetchUser, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "405" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "406" });
            }
        }
    });
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH DEPARTMENT  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-department', verifyToken, (req, res) => {
    const getDepartment = `SELECT * FROM department WHERE isDelete = ?`;
    db.query(getDepartment, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No department found!" });
            }
        }
    });
});

// ###################################################################################################################################################################################
// #####################################################################  ADD DEPARTMENT  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/add-department', verifyToken, (req, res) => {
    const { departmentData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const departmentDataName = sanitizeAndValidate(departmentData.name, validationRules);
    const departmentDataStatus = sanitizeAndValidate(departmentData.status, validationRules);
    const departmentDataDescription = sanitizeAndValidate(departmentData.description, validationRules);

    if (!sanitizeUserId || !departmentDataName || !departmentDataStatus || !departmentDataDescription) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM department WHERE name = ? AND isDelete = ?`;
        db.query(select, [departmentDataName, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Department is already exist!" });
                } else {
                    const addDepartment = `INSERT INTO department (name, status, description, date) VALUES (?, ?, ?, ?)`;
                    db.query(addDepartment, [departmentDataName, departmentDataStatus, departmentDataDescription, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                            db.query(insertNot, [sanitizeUserId, "Department", `You've successfully added ${departmentDataName}`, currentDate], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${departmentDataName} has been successfully added!` });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  EDIT DEPARTMENT  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/edit-department', verifyToken, (req, res) => {
    const { editDepartmentData } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const editId = (editDepartmentData.id).toString();

    const editDepartmentDataId = sanitizeAndValidate(editId, validationRules);
    const editDepartmentDataName = sanitizeAndValidate(editDepartmentData.name, validationRules);
    const editDepartmentDataStatus = sanitizeAndValidate(editDepartmentData.status, validationRules);

    if (!editDepartmentDataId || !editDepartmentDataName || !editDepartmentDataStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM department WHERE name = ? AND isDelete = ? AND id != ?`;
        db.query(select, [editDepartmentDataName, "not", editDepartmentDataId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Department is already exist!" });
                } else {
                    const updateDepartment = `UPDATE department SET name = ?, status = ? WHERE id = ?`;
                    db.query(updateDepartment, [editDepartmentDataName, editDepartmentDataStatus, editDepartmentDataId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: `Department has been successfully updated!` });
                        }
                    });
                }
            }
        });
    }

});

// ###################################################################################################################################################################################
// #####################################################################  DELETE DEPARTMENT  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/delete-department', verifyToken, (req, res) => {
    const { deleteDepartment, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];
    const deleteId = (deleteDepartment.id).toString();
    const deleteDepartmentId = sanitizeAndValidate(deleteId, validationRules);
    const deleteDepartmentName = sanitizeAndValidate(deleteDepartment.name, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!deleteDepartmentId || !deleteDepartmentName || !sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const deleteD = `UPDATE department SET isDelete = ? WHERE id = ?`;
        db.query(deleteD, ["Deleted", deleteDepartmentId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insert = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insert, [sanitizeUserId, "Delete Department", `You've successfully deleted the ${deleteDepartmentName}`, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${deleteDepartmentName} has been successfully deleted!` });
                    }
                });
            }
        });
    }
});


// ###################################################################################################################################################################################
// #####################################################################  FETCH COURSES  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-courses', verifyToken, (req, res) => {
    const getCourses = `SELECT * FROM courses WHERE isDelete = ?`;
    db.query(getCourses, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No department found!" });
            }
        }
    });
});

// ###################################################################################################################################################################################
// #####################################################################  ADD COURSE  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/add-courses', verifyToken, (req, res) => {
    const { courseData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const courseDataName = sanitizeAndValidate(courseData.name, validationRules);
    const courseDataStatus = sanitizeAndValidate(courseData.status, validationRules);
    const courseAcronym = sanitizeAndValidate(courseData.acronym, validationRules);

    if (!sanitizeUserId || !courseDataName || !courseDataStatus || !courseAcronym) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM courses WHERE course = ? AND isDelete = ?`;
        db.query(select, [courseDataName, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Course is already exist!" });
                } else {
                    const addCourse = `INSERT INTO courses (course, status, acronym, date) VALUES (?, ?, ?, ?)`;
                    db.query(addCourse, [courseDataName, courseDataStatus, courseAcronym, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                            db.query(insertNot, [sanitizeUserId, "Course", `You've successfully added ${courseDataName}`, currentDate], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${courseAcronym} has been successfully added!` });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  EDIT COURSE  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/edit-courses', verifyToken, (req, res) => {
    const { editCourseData } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const editId = (editCourseData.id).toString();

    const editCourseDataId = sanitizeAndValidate(editId, validationRules);
    const editCourseDataName = sanitizeAndValidate(editCourseData.name, validationRules);
    const editCourseDataStatus = sanitizeAndValidate(editCourseData.status, validationRules);

    if (!editCourseDataId || !editCourseDataName || !editCourseDataStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM courses WHERE course = ? AND isDelete = ? AND id != ?`;
        db.query(select, [editCourseDataName, "not", editCourseDataId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Course is already exist!" });
                } else {
                    const updateCourses = `UPDATE courses SET course = ?, status = ? WHERE id = ?`;
                    db.query(updateCourses, [editCourseDataName, editCourseDataStatus, editCourseDataId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: `Course has been successfully updated!` });
                        }
                    });
                }
            }
        });
    }

});

// ###################################################################################################################################################################################
// #####################################################################  DELETE COURSE  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/delete-courses', verifyToken, (req, res) => {
    const { deleteCourses, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];
    const deleteId = (deleteCourses.id).toString();
    const deleteCoursesId = sanitizeAndValidate(deleteId, validationRules);
    const deleteCoursesName = sanitizeAndValidate(deleteCourses.name, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!deleteCoursesId || !deleteCoursesName || !sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const deleteC = `UPDATE courses SET isDelete = ? WHERE id = ?`;
        db.query(deleteC, ["Deleted", deleteCoursesId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insert = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insert, [sanitizeUserId, "Delete Course", `You've successfully deleted the ${deleteCoursesName}`, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${deleteCoursesName} has been successfully deleted!` });
                    }
                });
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH SCHOOL YEAR  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-school-year', verifyToken, (req, res) => {
    const getSchoolYear = `SELECT * FROM school_year WHERE isDelete = ?`;
    db.query(getSchoolYear, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No school year found!" });
            }
        }
    });
});

// ###################################################################################################################################################################################
// #####################################################################  ADD SCHOOL YEAR  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/add-school-year', verifyToken, (req, res) => {
    const { schollYearData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const syName = sanitizeAndValidate(schollYearData.name, validationRules);
    const syStatus = sanitizeAndValidate(schollYearData.status, validationRules);

    if (!sanitizeUserId || !syName || !syStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM school_year WHERE school_year = ? AND isDelete = ?`;
        db.query(select, [syName, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "School year is already exist!" });
                } else {
                    const addCourse = `INSERT INTO school_year (school_year, status, date) VALUES (?, ?, ?)`;
                    db.query(addCourse, [syName, syStatus, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                            db.query(insertNot, [sanitizeUserId, "School Year", `You've successfully added ${syName}`, currentDate], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${syName} has been successfully added!` });
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  EDIT SCHOOL YEAR  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/edit-school-year', verifyToken, (req, res) => {
    const { editSchoolYearData } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const editId = (editSchoolYearData.id).toString();

    const editSYId = sanitizeAndValidate(editId, validationRules);
    const editSY = sanitizeAndValidate(editSchoolYearData.name, validationRules);
    const editSYStatus = sanitizeAndValidate(editSchoolYearData.status, validationRules);

    if (!editSYId || !editSY || !editSYStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM school_year WHERE school_year = ? AND isDelete = ? AND id != ?`;
        db.query(select, [editSY, "not", editSYId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "School year is already exist!" });
                } else {
                    const updateCourses = `UPDATE school_year SET school_year = ?, status = ? WHERE id = ?`;
                    db.query(updateCourses, [editSY, editSYStatus, editSYId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: `School year has been successfully updated!` });
                        }
                    });
                }
            }
        });
    }

});

// ###################################################################################################################################################################################
// #####################################################################  DELETE SCHOOL YEAR  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/delete-school-year', verifyToken, (req, res) => {
    const { deleteSchoolYear, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];
    const deleteId = (deleteSchoolYear.id).toString();
    const deleteSYId = sanitizeAndValidate(deleteId, validationRules);
    const deleteSY = sanitizeAndValidate(deleteSchoolYear.name, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!deleteSYId || !deleteSY || !sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const deleteC = `UPDATE school_year SET isDelete = ? WHERE id = ?`;
        db.query(deleteC, ["Deleted", deleteSYId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insert = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insert, [sanitizeUserId, "Delete School Year", `You've successfully deleted the ${deleteSY}`, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${deleteSY} has been successfully deleted!` });
                    }
                });
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  EDIT USER  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/edit-user', verifyToken, (req, res) => {
    const { editUserData } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const deleteId = (editUserData.id).toString();
    const editUserId = sanitizeAndValidate(deleteId, validationRules);
    const editUserFirstName = sanitizeAndValidate(editUserData.firstName, validationRules);
    const editUserLastName = sanitizeAndValidate(editUserData.lastName, validationRules);
    const editUserUsername = sanitizeAndValidate(editUserData.username, validationRules);
    const editUserUserType = sanitizeAndValidate(editUserData.userType, validationRules);

    if (!editUserId || !editUserFirstName || !editUserLastName || !editUserUsername || !editUserUserType) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check username
        if (editUserUsername.length >= 5) {
            const check = `SELECT * FROM users WHERE username = ? AND id != ? AND isDelete = ?`;
            db.query(check, [editUserUsername, editUserId, "not"], (error, results) => {
                if (error) {
                    res.status(401).json({ message: "Server side error!" });
                } else {
                    if (results.length > 0) {
                        res.status(401).json({ message: "Username is already exist!" });
                    } else {
                        // update user credentials
                        const updateUser = `UPDATE users SET first_name = ?, middle_name = ?, last_name = ?, username = ?, user_type = ? WHERE id = ?`;
                        db.query(updateUser, [editUserFirstName, editUserData.middleName, editUserLastName, editUserUsername, editUserUserType, editUserId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                res.status(200).json({ message: `User successfully updated!` });
                            }
                        });
                    }
                }
            });
        } else {
            res.status(401).json({ message: "Username must have at least 5 characters!" });
        }
    }
});

// ###################################################################################################################################################################################
// #####################################################################  DELETE USER  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/delete-user', verifyToken, (req, res) => {
    const { deleteUser, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const deleteId = (deleteUser.id).toString();
    const deleteUserId = sanitizeAndValidate(deleteId, validationRules);
    const deleteUserFirstName = sanitizeAndValidate(deleteUser.firstName, validationRules);
    const deleteUserLastName = sanitizeAndValidate(deleteUser.lastName, validationRules);
    const ownerId = sanitizeAndValidate(userId, validationRules);

    if (!deleteId || !deleteUserId || !deleteUserFirstName || !deleteUserLastName || !ownerId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // delete user
        const deleteU = `UPDATE users SET isDelete = ? WHERE id = ?`;
        db.query(deleteU, ["Deleted", deleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insertNot, [ownerId, "Delete User", `You've successfully deleted ${deleteUserFirstName} ${deleteUser.middleName} ${deleteUserLastName}`, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${deleteUserFirstName} ${deleteUser.middleName} ${deleteUserLastName} has been successfully deleted!` });
                    }
                });
            }
        });
    }
});

// ###################################################################################################################################################################################
// #####################################################################  FETCH SETTINGS  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/fetch-settings', (req, res) => {
    const getSettings = `SELECT * FROM settings`;
    db.query(getSettings, (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No Settings data found!" });
            }
        }
    });
});

// ###################################################################################################################################################################################
// #####################################################################  UPDATE SETTINGS  ############################################################################################
// ###################################################################################################################################################################################
const systemImageUpload = multer({
    dest: 'assets/settings image/',
});

app.post('/api/update-logo', verifyToken, imageUpload.single('systemLogo'), (req, res) => {

    const originalFileName = req.file.originalname;
    const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
    const uniqueFilePath = `assets/settings image/${uniqueFileName}`;

    const typeMime = mime.lookup(originalFileName);

    if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
        fs.rename(req.file.path, uniqueFilePath, (err) => {
            if (err) {
                res.status(401).json({ message: "Error to upload file" });
            } else {
                const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                    return res.status(401).send({ message: "Invalid File Name!" });
                }
                else {
                    const insert = `UPDATE settings SET system_logo = ? WHERE id = ?`;
                    db.query(insert, [uniqueFilePath, '1'], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: "System has been changed!" });
                        }
                    });
                }
            }
        });
    }
    else {
        res.status(401).json({ message: "Invalid Image Type!" });
    }

});

app.post('/api/update-cover', verifyToken, imageUpload.single('systemCover'), (req, res) => {

    const originalFileName = req.file.originalname;
    const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
    const uniqueFilePath = `assets/settings image/${uniqueFileName}`;

    const typeMime = mime.lookup(originalFileName);

    if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
        fs.rename(req.file.path, uniqueFilePath, (err) => {
            if (err) {
                res.status(401).json({ message: "Error to upload file" });
            } else {
                const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                    return res.status(401).send({ message: "Invalid File Name!" });
                }
                else {
                    const insert = `UPDATE settings SET system_cover = ? WHERE id = ?`;
                    db.query(insert, [uniqueFilePath, '1'], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: "System cover photo has been changed!" });
                        }
                    });
                }
            }
        });
    }
    else {
        res.status(401).json({ message: "Invalid Image Type!" });
    }

});

app.post('/api/update-settings', verifyToken, (req, res) => {
    const { settings } = req.body;

    const update = `UPDATE settings SET system_name = ?, system_short_name = ?, welcome_content = ?, about_us = ?, email = ?, contact_number = ?, address = ?, date = ? WHERE id = ?`;
    db.query(update, [settings.systemName, settings.systemShortName, settings.welcomeContent, settings.aboutUs, settings.email, settings.contactNumber, settings.address, currentDate, '1'], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: "System information has been successfully updated!" });
        }
    });

});

// ###################################################################################################################################################################################
// #####################################################################  FETCH NOTIFICATION  ############################################################################################
// ###################################################################################################################################################################################
app.post('/api/fetch-notifications', verifyToken, (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // get notifications
        const getNotification = `SELECT * FROM notifications WHERE user_id = ? AND isDelete = ?`;
        db.query(getNotification, [sanitizeUserId, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(200).json({ message: results });
                } else {
                    res.status(401).json({ message: "No notification Found!" });
                }
            }
        });
    }
});

// async function extractTextFromPDF(pdfPath) {
//     const dataBuffer = fs.readFileSync(pdfPath);
//     const pdf = await PDFParser(dataBuffer);
//     return pdf.text;
// }

// // Function to find the page number containing the specified text
// function findPageWithText(text, searchText) {
//     const pages = text.split(/\f/); // Split by page break character
//     for (let i = 0; i < pages.length; i++) {
//         if (pages[i].includes(searchText)) {
//             return i + 1; // Page numbers are 1-based
//         }
//     }
//     return -1; // Return -1 if the text is not found in any page
// }

// const pdfPath = 's.pdf';
// const abstractSearchText = 'Abstract';

// async function main() {
//     try {
//         const fullText = await extractTextFromPDF(pdfPath);

//         const abstractPage = findPageWithText(fullText, abstractSearchText);

//         console.log(`Abstract is on page ${abstractPage}`);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();

// const imagePath = './assets/images/s.png';

// Perform OCR on the image
// Tesseract.recognize(
//     imagePath,
//     'eng', // Language code (e.g., 'eng' for English)
//     {
//         logger: (info) => console.log(info), // Optional: to see progress and debug info
//     }
// ).then(({ data: { text } }) => {
//     console.log('Extracted text:');
//     console.log(text);
// }).catch((error) => {
//     console.error(error);
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});