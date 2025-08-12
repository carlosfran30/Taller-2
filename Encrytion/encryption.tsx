import { AES, enc } from 'react-native-crypto-js';

const secretKey = 'clave_vikinga_2023';

export const encrypt = (text) => {
  return AES.encrypt(text, secretKey).toString();
};

export const decrypt = (ciphertext) => {
  const bytes = AES.decrypt(ciphertext, secretKey);
  return bytes.toString(enc.Utf8);
};