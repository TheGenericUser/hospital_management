const { getDecryptedCookie } = require('../services/userCookieService');
const { getSessionData } = require('../services/loginService');

const checkLoginAndRole = (allowedRoles, redirectTo, redirectToForRole) => {
    return async (req, res, next) => {
        const userId = getDecryptedCookie(req);
        if (!userId) {
            return res.redirect(redirectTo)
        }


        const sessionData = await getSessionData(req);
        const userRole = sessionData.value.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            // Redirect if role does not match any of the allowed roles
            return res.redirect(redirectToForRole);
        }

        next();
    };
};

module.exports = {checkLoginAndRole};
