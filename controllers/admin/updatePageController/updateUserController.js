const { validationResult } = require('express-validator');
const { User } = require('../../../models/userModel');

const updateUser = async (req, res) => {
    const title = 'Admin — Update Users';
    const primary = 'update-users';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/update/user-update', {
            title,
            primary,
            success: false,
            message: errors.array()[0].msg
        });
    }

    const { id: userId } = req.query;
    try {
        const user = await User.findById(userId, {
            remember_me: 0,
            activeSession: 0,
            __v: 0
        });

        if (user.length === 0) {
            return res.render('admin/update/user-update', {
                title,
                primary,
                success: false,
                message: 'Invalid id'
            });
        }

        res.render('admin/update/user-update', {
            title,
            primary,
            user,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { updateUser };