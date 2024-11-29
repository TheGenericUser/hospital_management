const { body } = require('express-validator');
const { User } = require('../../../models/userModel');

const addUsersValidationRules = () => {
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
        body('role')
            .optional({ nullable: true, checkFalsy: true })
            .isIn(['user', 'doctor', 'staff', 'admin'])
            .withMessage('Role must be one of the following: user, doctor, staff, admin.'),
        body('age')
            .optional({ nullable: true, checkFalsy: true })
            .isInt({ min: 0, max: 120 })
            .withMessage('Age must be between 0 and 120.'),
        body('gender')
            .optional({ nullable: true, checkFalsy: true })
            .isIn(['male', 'female', 'other'])
            .withMessage('Gender must be male, female, or other.')
    ];
};

module.exports = { addUsersValidationRules };