const { body } = require('express-validator');

const codeValidationRules = (code) => {
    return [
        body(code)
        .isInt({ min: 11111111, max: 99999999 })
        .withMessage('Invalid Code.')
    ];
};

module.exports = { codeValidationRules };