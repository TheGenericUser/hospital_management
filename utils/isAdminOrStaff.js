const { getSessionData } = require('../services/loginService');

const isAdminOrStaff = async (req) => {
    const userData = await getSessionData(req);
    return userData && (userData.value.role === 'admin' || userData.value.role === 'staff');
};

module.exports = { isAdminOrStaff }