const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');

const aboutView  = async (req, res) => {
    const title = 'About Us'
    const primary = 'about';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {
        res.render('user/about', {
            title,
            primary,
            userLoggedIn,
            isAdmin,
            success: true,
        });
    } catch (error) {
        console.error('Error rendering booking page:', error);
        return res.redirect('/doctors');
    }
};

module.exports = { aboutView };