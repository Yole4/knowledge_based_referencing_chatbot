const express = require('express');
const cors = require('cors');
const Tesseract = require('tesseract.js');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:300'],
    methods: ['POST', 'GET'],
    credentials: true
}));

const imagePath = './assets/images/s.png';

// Perform OCR on the image
Tesseract.recognize(
    imagePath,
    'eng', // Language code (e.g., 'eng' for English)
    {
        logger: (info) => console.log(info), // Optional: to see progress and debug info
    }
).then(({ data: { text } }) => {
    console.log('Extracted text:');
    console.log(text);
}).catch((error) => {
    console.error(error);
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});