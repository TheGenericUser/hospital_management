const { getDecryptedCookie } = require('../services/userCookieService');

const checkLoggedOut = (redirectTo) => {
    return (req, res, next) => {
        // Check if user is logged in by checking the userId cookie
        const userId = getDecryptedCookie(req);
        if (userId) {
            return res.redirect(redirectTo);
        }

        next();
    };
};


module.exports = {checkLoggedOut};
