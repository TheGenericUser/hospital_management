const { query } = require('express-validator');

const idValidationRules = () => {
    return [
        query('id')
            .isString().withMessage('Invalid Id')
            .isLength({ min: 24, max: 24 }).withMessage('Invalid Id'),
    ];
};

module.exports = { idValidationRules };