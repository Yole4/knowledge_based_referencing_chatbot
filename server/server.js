const express = require('express');
const cors = require('cors');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const PDFParser = require('pdf-parse');
require('dotenv').config();
const port = process.env.DB_PORT;
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { sanitizeAndValidate, sanitizeAndValidateArray } = require('./utils/validator and sanitizer/ValidatorAndSanitizer');
const db = require('./utils/database/DatabaseConnection'); // database
const { verifyToken } = require('./utils/auth/AuthVerify'); // verify token

const app = express();

app.use(express.json());
app.use(cors({
    origin: [`${process.env.FE_LINK}`],
    methods: ['POST', 'GET'],
    credentials: true
}));

const secretKey = process.env.SECRET_KEY; // my secret key

// ###################################################################################################################################################################################
// #####################################################################  PROTECTED SIDE  ############################################################################################
// ###################################################################################################################################################################################
app.get('/api/protected', verifyToken, (req, res) => {
    const { user } = req;

    res.status(200).json({ message: 'Success', user: user });
});

// require image folder
app.use('/assets', express.static('assets'));

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
                            username: results[0].usernameSanitized,
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