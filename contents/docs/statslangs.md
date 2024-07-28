---
Title: Statslangs
Category: API
---
Explore Your GitHub Language Statistics: Discover Your Most Used Languages

### Example of request

```shell
https://api.kremilly.com/statslangs?user=YOUR_USERNAME
```

> *Replace `YOUR_USERNAME` with your GitHub username*

### A simple example of use in JavaScript

```javascript
// Replace "kremilly" for your GitHub username
fetch('https://api.kremilly.com/statslangs?user=kremilly').then(
   json => json.json()
).then(callback => { 
   console.log(callback) 
})
```

#### Simple output of request:

```json
{
      "language": "Python",
      "percentage": {
        "formatted": "42%",
        "value": 42.10526315789473
      },
      "repositories": 8
}
```

### Queries Parameters

* `user` Set the username
* `forks` List also forks repositories (`optional`; defaut: `false`)

## Possible messages knowning

* User does not exist on GitHub (Status code: `404`)
* Error fetching pinned repositories (Status code: `500`)
