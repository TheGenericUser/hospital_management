const { query } = require('express-validator');
const { Department } = require('../../../models/departmentModel');

const searchDoctorsValidationRules = () => {
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
        query('mobile')
            .optional()
            .isString().withMessage('Invalid mobile number.')
            .matches(/^\d{8,10}$/).withMessage('Invalid mobile number.'),
        query('department')
            .optional()
            .isString().withMessage('Invalid Department.')
            .trim()
            .custom(async (value) => {
                if(value === 'na'){
                    return true;
                }
                const titleCasedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
                const department = await Department.findOne({ name: titleCasedValue });
                if (!department) {
                    throw new Error('Invalid Department'); 
                }
                return true;
            }),
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

module.exports = { searchDoctorsValidationRules };