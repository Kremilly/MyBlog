---
Title: PDFScrape
Category: API
---
## Example of request

```shell
https://api.kremilly.com/pdfscrape?pdf=YOUR_URL
```

### Queries Parameters

- `url`: Set the your URL for make scrape

### Data returned by the API

* `url` PDF file url
* `name` Name of pdf file
* `pages` Pages total of document
* `size` Size (in bytes) of document
* `encrypted` Document password status
* `status_code` HTTP status code of document
