const { body } = require('express-validator');

const loginValidationRules = () => {
    return [
        body('email')
            .normalizeEmail(),
        body('password')
            .isString().withMessage('Invalid Password.')
            .isLength({ min: 10 }).withMessage('Password must be at least 10 characters long.'),
        body('rememberMe')
            .optional()
            .isBoolean()
            .withMessage('Invalid Form.'),
    ];
};

module.exports = { loginValidationRules };