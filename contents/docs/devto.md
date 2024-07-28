---
Title: Devto
Category: API
---
This API can be useful for developers who want to integrate a user's articles into their own websites or applications, providing a convenient way to access and display the content of a specific user.

## Example of badge

```markdown
[![<USER_NAME>'s articles](http://api.kremilly.com/devto?username=<YOUR_USERNAME>&color=<YOUR_HEX_COLOR>)](https://dev.to/<USER_NAME>)
```

This example was rendered with the username set as `kremilly`

<details>
  <summary>See <b>markdown</b> code</summary>
  <pre><code>[![KREMILLY's articles](http://api.kremilly.com/devto?username=kremilly&color=58a6ff)](https://dev.to/kremilly)</code></pre>
</details>

[![KREMILLY's articles](http://api.kremilly.com/devto?username=kremilly&color=58a6ff)](https://dev.to/kremilly)

## Queries Parameters

* `username`: Set the your username on Dev.to
* `color`: Set the your color for links (Optional)
