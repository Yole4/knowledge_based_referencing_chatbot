const express = require('express');
const cors = require('cors');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const PDFParser = require('pdf-parse');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:300'],
    methods: ['POST', 'GET'],
    credentials: true
}));

async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdf = await PDFParser(dataBuffer);
    return pdf.text;
}

// Function to find the page number containing the specified text
function findPageWithText(text, searchText) {
    const pages = text.split(/\f/); // Split by page break character
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].includes(searchText)) {
            return i + 1; // Page numbers are 1-based
        }
    }
    return -1; // Return -1 if the text is not found in any page
}

const pdfPath = 's.pdf';
const abstractSearchText = 'Abstract';

async function main() {
    try {
        const fullText = await extractTextFromPDF(pdfPath);

        const abstractPage = findPageWithText(fullText, abstractSearchText);

        console.log(`Abstract is on page ${abstractPage}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();

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

app.listen(3001, () => {
    console.log("Server running on port 3001");
});