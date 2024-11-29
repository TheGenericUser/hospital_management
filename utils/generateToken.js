const crypto = require('crypto');

const generateSecureToken = (length = 64) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

module.exports = { generateSecureToken };