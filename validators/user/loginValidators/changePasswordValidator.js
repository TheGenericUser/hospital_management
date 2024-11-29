const { body } = require('express-validator');

const changePasswordValidationRules = () => {
    return [
        body('new_password')
            .isString().withMessage('Invalid Password.')
            .isLength({ min: 10 }).withMessage('Password must be at least 10 characters long.'),
    ];
};

module.exports = { changePasswordValidationRules };