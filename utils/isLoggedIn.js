const { getDecryptedCookie } = require('../services/userCookieService');

const isLoggedIn = (req) => {
    userId = getDecryptedCookie(req);
    return !!userId;
}

module.exports = { isLoggedIn }