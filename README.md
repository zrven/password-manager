# password-manager

A simple password manager app for iOS and Android that has been developed in React Native. All data is stored and retrieved using highly secure AES encryption. The current version works only in a single device and doesn't make any external calls. 

This repository contains full source code of the Password Manager. Welcome to contribute to the source code.

Current base version supports

- Manage user (Signup, Signout, Remove User)
- Manage accounts (Add, Modify, Delete)
- Encrypt account data to vault with user provided token
- Stores and retrieves encrypted data from local storage
- Support day/night mode

## Screenshots
![signin](https://user-images.githubusercontent.com/8434552/102729875-be2a6b00-42ef-11eb-8e18-2a3ad7853a99.png)
![feed](https://user-images.githubusercontent.com/8434552/102729930-f16cfa00-42ef-11eb-89c6-e9a86cdc7247.png)
![account](https://user-images.githubusercontent.com/8434552/102729932-f2059080-42ef-11eb-8991-b3dccc0ef757.png)
![nighmodeAccount](https://user-images.githubusercontent.com/8434552/102730032-65a79d80-42f0-11eb-85ea-4a7e93025285.png)
![nightmodeModify](https://user-images.githubusercontent.com/8434552/102730033-66403400-42f0-11eb-92ec-6a4289af0248.png)

## Development

```bash
git clone https://github.com/zrven/password-manager.git
npm i
npx pod-install
npx react-native run-ios
```

## Production

Modify source code by moving the vault from local storage to some other data store before using in app.
