import { encrypt } from "helpers/encrypt";

interface LoginInfo {
  email: string;
  password: string;
}

export function loginService({ email, password }: LoginInfo) {
  return new Promise((resolve) => {
    const token = encrypt(email, password);
    setTimeout(() => {
      resolve(token);
    }, 1000);
  });
}
