---
Title: Wikipedia
Category: API
---
A simple Wikipedia Rest API

## Example of request

```shell
https://api.kremilly.com/wikipedia?location=en&term=Microsoft&thumb_size=256&short_summary=true
```

### A simple example of use in JavaScript

```javascript
// Replace "Microsoft" for your article on Wikipedia
fetch('api.kremilly.com/wikipedia?location=en&term=Microsoft&thumb_size=256&short_summary=true').then(
   json => json.json()
).then(callback => { 
   console.log(callback) 
})
```

> *See [here](https://github.com/kremilly/MyApis/tree/main/examples/wikipedia) others examples in others languages and using Axios.js*

#### Simple output of request:

```json
{
  "page_url": "https://en.wikipedia.org/wiki/Microsoft",
  "summary": "Microsoft Corporation is an American multinational corporation and technology company headquartered in Redmond, Washington. Microsoft's best-known software products are the Windows line of operating systems, the Microsoft 365 suite of productivity applications, and the Edge web browser. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 14 in the 2022 Fortune 500 rankings of the largest United States corporations by total revenue; and it was the world's largest software maker by revenue in 2022 according to Forbes Global 2000. It is considered one of the Big Five American information technology companies, alongside Alphabet (parent company of Google), Amazon, Apple, and Meta (parent company of Facebook).",
  "thumbnail": {
    "height": 171,
    "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Aerial_Microsoft_West_Campus_August_2009.jpg/256px-Aerial_Microsoft_West_Campus_August_2009.jpg",
    "width": 256
  },
  "title": "Microsoft"
}
```

### Queries Parameters

* `location` Set Wikipedia region
* `term` Term of get Wikipedia Article
* `thumb_size` Thumbnail image
* `short_summary` Show only first paragraph

### Data returned by the API

* `title` Article title
* `summary` Article summary
* `thumbnail` Article thumbnail image and image properties
* `page_url` Wikipedia article url

## Possible messages knowning

* Wikipedia region is invalid
