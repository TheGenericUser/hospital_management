const { query } = require('express-validator');

const searchWalkinPatientsValidationRules = () => {
    return [
        query('id')
            .optional()
            .trim()
            .isString().withMessage('Invalid Id')
            .isLength({ min: 24, max: 24 }).withMessage('Invalid Id'),
        query('name')
            .optional()
            .trim()
            .isString().withMessage('Name must be a string')
            .isLength({ min: 1, max: 255 }).withMessage('Name must be between 1 and 255 characters long.'),
        query('email')
            .optional()
            .isEmail().withMessage('Invalid email format')
            .normalizeEmail(),
        query('gender')
            .optional()
            .isIn(['na', 'male', 'female', 'other']).withMessage('Invalid gender'),
        query('ageBelow')
            .optional()
            .isInt({ min: 1, max: 120 }).withMessage('Age must be a valid integer between 1 and 100'),
        query('ageAbove')
            .optional()
            .isInt({ min: 1, max: 120 }).withMessage('Age must be a valid integer between 1 and 100'),
        query('createdBefore')
            .optional()
            .isDate().withMessage('Created before must be a valid date'),
        query('createdAfter')
            .optional()
            .isDate().withMessage('Created after must be a valid date'),
        query('page')
            .isInt({ min: 1 }).withMessage('Page must be greater than or equal to 1'),
    ];
};

module.exports = { searchWalkinPatientsValidationRules };