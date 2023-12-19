




































// const scanDocument = async (req, res) => {
//     const originalFileName = req.file.originalname;
//     const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
//     const uniqueFilePath = `assets/archive files/${uniqueFileName}`;
//     fs.rename(req.file.path, uniqueFilePath, (err) => {
//         if (err) {
//             res.status(401).json({ message: "Error moving the upload file!" });
//         }
//         else {
//             const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
//             if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
//                 return res.status(401).send({ message: "Invalid File Name!" });
//             }
//             else {
//                 if (req.file.size > 5242880) {
//                     res.status(401).json({ message: "File is too large!" });
//                 }
//                 else {
//                     // Check if the uploaded file has a PDF or DOCX extension
//                     const mimeType = mime.lookup(sanitizedFileName);
//                     if (mimeType !== 'application/pdf') {
//                         res.status(401).json({ message: "Invalid file type! Accept only PDF File!" })
//                     }
//                     else {
//                         processFile(uniqueFilePath)
//                             .then(pageTexts => {

//                                 let isFound = false;
//                                 let foundPage = [], foundAbstract = [];

//                                 pageTexts.forEach((pageText, pageNum) => {
//                                     const pageNumber = pageNum;
//                                     const contentEveryPage = pageText.replace(/\s+/g, ' ');

//                                     if ((contentEveryPage).toLowerCase().includes("abstract")) {
//                                         foundPage.push(pageNumber);
//                                         foundAbstract.push(contentEveryPage);
//                                         isFound = true;
//                                         return true;
//                                     }
//                                 });

//                                 if (isFound) {
//                                     const splitFoundAbstract = foundAbstract[0].split(/abstract/i);

//                                     // console.log("\n",splitFoundAbstract, foundPage);
//                                     res.status(200).json({ foundAbstract: splitFoundAbstract[1], pageNumber: foundPage[0] + 1, fileName: uniqueFilePath });
//                                 } else {
//                                     // Remove the file
//                                     fs.unlink(uniqueFilePath, (err) => {
//                                         if (err) {
//                                             console.error('Error deleting file:', err);
//                                         }
//                                     });
//                                     res.status(401).json({ message: "There is no abstract found! Check your PDF file and upload again!" });
//                                 }
//                             })
//                             .catch(error => {
//                                 res.status(401).json({ message: "Something went wrong!" });
//                                 console.error('Error extracting text from PDF', error);
//                             });
//                     }
//                 }
//             }
//         }

//     });
// };


// const chatRequest = async (req, res) => {
//     const { userInput } = req.body;

//     if (!userInput) {
//         res.status(404).json('404');
//     }

//     const badWords = BadWords();
//     const chatRequest = createChatbot();

//     let isChatBotResponse = false;

//     // check if the user input contains bad words
//     const checkUserInput = badWords.map((item) => {
//         const userInputArray = userInput.split(' ');

//         const mapUserInput = userInputArray.map(userInputItem => {
//             if (item.toLowerCase() === userInputItem.toLowerCase()) {
//                 isChatBotResponse = true;
//             }
//         });
//     });

//     if (isChatBotResponse) {
//         res.status(200).json({ message: "Sorry, But I'm unable to provide or discuss content that includes inappropriate or offensive language." });
//     } else {
//         const chat = chatRequest(userInput);

//         if (chat) {
//             res.status(200).json({ message: chat });
//         } else {
//             res.status(403).json('403');
//         }
//     }

// };