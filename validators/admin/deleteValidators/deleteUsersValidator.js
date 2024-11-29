const { body } = require('express-validator');
const { User } = require('../../../models/userModel');

const deleteUsersValidationRules = () => {
    return [
        body('id')
            .custom(async (value) => {
                const user = await User.findById(value);
                if (!user) {
                    throw new Error('Server Error.');
                }
                if(user.role === 'admin'){
                    throw new Error('Admins cannot change the privileges of other admins.');
                }
                return true;
            }),
    ];
};

module.exports = { deleteUsersValidationRules };