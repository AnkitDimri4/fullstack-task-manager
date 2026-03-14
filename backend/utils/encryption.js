const CryptoJS = require("crypto-js");

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.AES_SECRET   
  ).toString();
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, process.env.AES_SECRET);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

module.exports = { encryptData, decryptData };
