---
Title: PDFInfo
Description: Extract information from PDF files, such as the number of pages, file size, and whether the file is password-protected.
Category: API
---
## Example of request

```shell
https://api.kremilly.com/pdfinfo?pdf=YOUR_PDF_URL
```

### A simple example of use in JavaScript

```javascript
// Replace "YOUR_PDF_URL" for your pdf url
fetch('https://api.kremilly.com/pdfinfo?pdf=YOUR_PDF_URL').then(
   json => json.json()
).then(callback => { 
   console.log(callback) 
})
```

> [!note] *See [here](https://github.com/kremilly/MyApis/tree/main/examples/wikipedia) others examples in others languages and using Axios.js*

#### Simple output of request:

```json
{
  "encrypted": false,
  "name": "Karen_e_Priscila.pdf",
  "pages": 77,
  "size": "245 KB",
  "status_code": 200,
  "url": "https://www.mackenzie.br/fileadmin/OLD/47/Graduacao/CCBS/Cursos/Ciencias_Biologicas/1o_2012/Biblioteca_TCC_Lic/2009/2o_Semestre/Karen_e_Priscila.pdf"
}
```

### Queries Parameters

* `pdf` Set the your PDF url

### Data returned by the API

* `name` PDF file name
* `encrypted` Return if the file is password-protected
* `size` PDF file size
* `pages` Document total of page
* `status_code` HTTP status code of document
* `url` PDF file url
