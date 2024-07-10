---
Title: PassGuard
Package: cargo install passguard
---
![img](https://img.shields.io/crates/v/passguard?style=flat-square&logo=rust)

This Rust-based password and passphrase generator offers a versatile solution for creating secure, customizable passwords. With support for password size and include uppercase, numbers and symbols.

## Features

- Generation of passwords with lowercase letters, uppercase letters, numbers, and symbols.
- Generation of passphrases with random words.
- Customization of password length.
- Choice of generation method: password or passphrase.
- Display of generated password strength.

## Install

To Install using [crates.io](https://crates.io/)

```shell
cargo install passguard
```

## Example Usage

```shell
passguard
```

```text
Choose a method (password/passphrase): passphrase
Show password strength? (y/n): y
---------------------------------
Enter the minimum word length: 5
Enter the maximum word length: 5
Enter the number of words in the passphrase: 5
Enter the character to separate the words: -
Include uppercase letters? (y/n): y
Include numbers? (y/n): y
---------------------------------
Your password: Y6nwl-Rs3ep-4uoxr-Zgow4-Q9ykl
---------------------------------
Password strength: Very strong (Score: 4/4)
Crack time (Online with throttling (100 per hour)): centuries
```
