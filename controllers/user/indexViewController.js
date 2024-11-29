const { isLoggedIn } = require('../../utils/isLoggedIn');
const { isAdminOrStaff } = require('../../utils/isAdminOrStaff');

const indexView  = async (req, res) => {
    const title = 'Home';
    const primary = 'home';
    const userLoggedIn = isLoggedIn(req);
    const isAdmin = await isAdminOrStaff(req);
    try {

        res.render('user/index', {
            title,
            primary,
            userLoggedIn ,
            isAdmin
        });
    } catch (error) {
        console.error('Error rendering index page:', error);
        res.render('user/index', {
            title,
            primary,
            userLoggedIn ,
            isAdmin
        });
    }
};

module.exports = { indexView };