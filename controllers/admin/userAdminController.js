const userAdminController  = async (req, res) => {
    try {
        const title = 'Admin — Users';
        const primary = 'users';

        res.render('admin/users', {
            title,
            primary,
            success: true,
        });
    } catch (error) {
        console.error('Error rendering user admin page:', error);
        res.status(500).render('admin/users', {
            title,
            primary,
            success: false,
            message: 'Server Error.',
        });
    }
};

module.exports = { userAdminController };