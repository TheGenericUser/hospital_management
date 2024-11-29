const crypto = require('crypto');
const SECRET_KEY = process.env.ENCRYPTION_KEY_USER_ID;
const ALGORITHM = 'aes-256-ctr';

const generateIv = () => crypto.randomBytes(16);

function encrypt(data) {
    const iv = generateIv();
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(encryptedData) {
    const [ivHex, encryptedText] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedBuffer = Buffer.from(encryptedText, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}

const setEncryptedCookie = (res, data, age) => {
    const encryptedData = encrypt(data);  // Encrypt the user data
    const cookieOptions = {
        httpOnly: true,      // Prevent client-side JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Send cookies only over HTTPS in production
        maxAge: age * 1000,
        sameSite: 'Strict',  // CSRF protection
    };
    res.cookie(process.env.USER_ID, encryptedData, cookieOptions);  // Set the encrypted cookie
}

const getDecryptedCookie = (req) => {
    const cookieData = req.cookies[process.env.USER_ID];  // Read the encrypted cookie from request
    if (!cookieData) return null;  // If the cookie does not exist, return null
    return decrypt(cookieData);  // Decrypt the cookie value and return it
}

module.exports = { setEncryptedCookie, getDecryptedCookie };