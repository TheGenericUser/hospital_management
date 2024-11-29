const { body } = require('express-validator');
const { Department } = require('../../../models/departmentModel');

const deleteDepartmentsValidationRules= () => {
    return [
        body('id')
            .custom(async (value) => {
                const user = await Department.findById(value);
                if (!user) {
                    throw new Error('Server Error.');
                }
                return true;
            }),
    ];
};

module.exports = { deleteDepartmentsValidationRules };