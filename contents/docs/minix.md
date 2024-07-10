---
Title: Minix
Package: cargo install minix
---
![img](https://img.shields.io/crates/v/minix?style=flat-square&logo=rust)

A straightforward minifier for JavaScript and CSS files, developed using Rust. This tool efficiently reduces the size of JS and CSS files by removing unnecessary characters, whitespace, and comments without affecting functionality. Utilizing Rust’s performance and safety features, it offers a fast and reliable solution for optimizing web assets, improving load times and overall website performance. Ideal for developers looking for a lightweight and effective way to minimize their codebase.

To Install using [crates.io](https://crates.io)

```shell
cargo install minix
```

### Basic example usage:

JS:

```shell
minix -i file.js -o file.min.js

# OR

minix -i js/*.js -o bundle.js

# OR 

minix -i js/*.js
```

CSS:

```shell
minix -i file.css -o file.min.css

# OR

minix -i css/*.css -o bundle.css

# OR 

minix -i css/*.css
```
