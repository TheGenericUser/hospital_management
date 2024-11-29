// 672981ee70863ff770f348fa

const { getValue } = require('../services/memcachedClient');
const { getDecryptedCookie } = require('../services/userCookieService');

const getSessionData = async (req) => {
    const userId = getDecryptedCookie(req);
    if(!userId){
        return null;
    }

    const key = `session:${userId}`;
    const result = await getValue(key);
    return result;
};

module.exports = { getSessionData }