---
Title: 
---
![](https://img.shields.io/crates/v/hiddenbytes?style=flat-square&logo=rust)

HiddenBytes is a personal tool for exploring image steganography techniques and algorithms, ideal for experimenting with hiding information in images.

## Installation

```shell
cargo install hiddenbytes
```

## Usage

Encode:

```shell
hiddenbytes encode image.jpg message.txt secret.png
```

Decode:

```shell
hiddenbytes decode secret.png
```
