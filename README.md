# password-manager

A simple password manager app for iOS and Android developed in React Native. Take control of your passwords without relying on external entities. It allows a user to store and retrieve passwords with AES encryption. The current version works in a single device without any external calls. 

This repository contains full source code of the Password Manager. Welcome to contribute to the source code.

Current base version supports

- Manage accounts (Add, Modify, Delete)
- Encrypt and add accounts to vault with user provided token
- Manager user (Signup, Signout, Remove User)
- Stores encrypted data in local storage

## Development

```bash
git clone https://github.com/zrven/password-manager.git
npm i
npx pod-install
npx react-native run-ios
```

## Production

Modify source code by moving the vault from local storage to some other data store before using in app.

