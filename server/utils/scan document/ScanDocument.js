const pdfjsLib = require('pdfjs-dist');

function processFile(pdfPath) {
  return pdfjsLib.getDocument(pdfPath).promise
    .then(pdfDoc => {
      const numPages = pdfDoc.numPages;
      const pageTextPromises = [];

      function extractTextFromPage(pageNum) {
        return pdfDoc.getPage(pageNum)
          .then(page => {
            return page.getTextContent()
              .then(textContent => {
                const textItems = textContent.items;
                let pageText = '';

                for (let i = 0; i < textItems.length; i++) {
                  pageText += textItems[i].str + ' ';
                }

                return pageText;
              });
          });
      }

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        pageTextPromises.push(extractTextFromPage(pageNum));
      }

      return Promise.all(pageTextPromises)
        .then(pageTexts => {
          return pageTexts;
        });
    })
    .catch(error => {
      console.error('Error loading PDF document', error);
    });
}

module.exports = {processFile}; 
