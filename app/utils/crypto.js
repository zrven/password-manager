import CryptoJS from 'react-native-crypto-js';
import Logger from './Logger';

export const utf8 = CryptoJS.enc.Utf8;

export const encrypt = (text, encryptText) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptText).toString();
};

export const decrypt = (encryptedData, decryptToken) => {
  const decryptBytes = CryptoJS.AES.decrypt(encryptedData, decryptToken);
  try {
    return JSON.parse(decryptBytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    Logger.logError(error);
    throw error;
  }
};
