import CryptoJS from "crypto-js";

import { SECRET_KEY } from "constants/configs";

export const encrypt = (email: string, password: string) => {
  const loginInfo = {
    email,
    password
  };

  return CryptoJS.AES.encrypt(JSON.stringify(loginInfo), SECRET_KEY).toString();
};

export const decrypt = (str: string) =>
  JSON.parse(CryptoJS.AES.decrypt(str, SECRET_KEY).toString(CryptoJS.enc.Utf8));
