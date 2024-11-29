const { body } = require('express-validator');
const { Department } = require('../../../models/departmentModel');

const addDepartmentValidationRules = () => {
    return [
        body('name')
            .isString().withMessage('Invalid Name.')
            .isLength({ min: 1, max: 256 }).withMessage('Department name must be between 1 and 256 characters long.')
            .trim()
            .custom(async (value) => {
                const titleCasedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
                const department = await Department.findOne({ name: titleCasedValue });
                if (department) {
                    throw new Error('Department with the same name already exists.'); 
                }
                
                return true;
            }),
    ];
};

module.exports = { addDepartmentValidationRules };