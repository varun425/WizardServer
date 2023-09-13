const crypto = require('crypto');

const algorithm = "aes-256-cbc";
const secretKeyHex = "3084374af17dda96007b4e80ce899349b6517eee702f01e962a5baa6c785d544";
const initVectorHex = "a47b3eb6e363aff360a8b90a35fd8446";

const decryptReferralCode = async (code) => {
    try {
        const secretKey = Buffer.from(secretKeyHex, 'hex');
        const initVector = Buffer.from(initVectorHex, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, secretKey, initVector);
        let decryptedData = decipher.update(code, 'hex', 'utf-8');
        decryptedData += decipher.final();
        console.log("decryptedData*********",decryptedData);
        return decryptedData;
    } catch (error) {
        throw new Error('Error while decrypting referral code: ' + error.message);
    }
};

module.exports = {
    decryptReferralCode
};
