const crypto = require('crypto');

const algorithm = "aes-256-cbc";
const secretKeyHex = "3084374af17dda96007b4e80ce899349b6517eee702f01e962a5baa6c785d544";
const initVectorHex = "a47b3eb6e363aff360a8b90a35fd8446";

  const getReferralCode = (account="0x31D0A9A6C679598446245f0a01Ee09e26c1183E3") => {
    const secretKey = Buffer.from(secretKeyHex, "hex");
    const initVector = Buffer.from(initVectorHex, "hex");
    const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
    let encryptedData = cipher.update(account, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    console.log("encryptedData",encryptedData);
    // return encryptedData
  }

  getReferralCode()


  let x = encodeURIComponent("varun%20sale2")

  console.log("x",x);

  x2 = decodeURIComponent(x)

  console.log("x2",x2);