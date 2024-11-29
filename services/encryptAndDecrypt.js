const crypto = require('crypto');

const key = Buffer.from(process.env.ENCRYPTION_KEY_PDF, 'hex'); // 256-bit key

const encryptBuffer = (buffer) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    return {
        encryptedData: encrypted.toString('base64'),
        iv: iv.toString('base64'),
    };
};

const decryptBuffer = (encryptedData, ivBase64) => {
    const encryptedBuffer = Buffer.from(encryptedData, 'base64');
    const ivBuffer = Buffer.from(ivBase64, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), ivBuffer);
    return Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
};

module.exports = { encryptBuffer, decryptBuffer }