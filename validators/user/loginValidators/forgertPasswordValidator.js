const { body } = require('express-validator');
const { User } = require('../../../models/userModel');

const forgetPasswordValidationRules = () => {
    return [
        body('email')
            .normalizeEmail()
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (!user) {
                    throw new Error('Email doesn\'t exists.'); 
                }
                return true; 
            }),
    ];
};

module.exports = { forgetPasswordValidationRules };