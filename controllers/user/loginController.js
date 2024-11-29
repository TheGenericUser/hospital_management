const loginView  = async (req, res) => {
    const title = 'Login';
    const primary = 'login';
    try {

        res.render('user/login', {
            title,
            primary,
        });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.send("Server Error");
    }
};

module.exports = { loginView };