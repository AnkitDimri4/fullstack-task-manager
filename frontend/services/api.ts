import axios from "axios";
import CryptoJS from "crypto-js";

const AES_SECRET = process.env.NEXT_PUBLIC_AES_SECRET as string;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

type PlainObject = Record<string, unknown>;

export const encryptRequest = (data: PlainObject) => {
  const cipher = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    AES_SECRET
  ).toString();

  return { data: cipher };
};

export const decryptResponse = (cipher: string): PlainObject => {
  const bytes = CryptoJS.AES.decrypt(cipher, AES_SECRET);
  const json = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(json) as PlainObject;
};

export default api;
