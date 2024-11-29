const { body } = require('express-validator');
const { User } = require('../../../models/userModel');

const signupValidationRules = () => {
    return [
        body('name')
            .isString().withMessage('Invalid Name.')
            .isLength({ min: 1, max: 255 }).withMessage('Name must be between 1 and 255 characters long.')
            .trim(),
        body('email')
            .normalizeEmail()
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email already exists.'); 
                }
                return true; 
            }),
        body('password')
            .isString().withMessage('Invalid Password.')
            .isLength({ min: 10 }).withMessage('Password must be at least 10 characters long.'),
    ];
};

module.exports = { signupValidationRules };