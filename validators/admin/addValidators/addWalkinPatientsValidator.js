const { body } = require('express-validator');
const { WalkinPatient } = require('../../../models/walkinPatientModel');

const addWalkinPatientsValidationRules = () => {
    return [
        body('name')
            .isString().withMessage('Invalid Name.')
            .isLength({ min: 1, max: 255 }).withMessage('Name must be between 1 and 255 characters long.')
            .trim(),
        body('email')
            .normalizeEmail()
            .custom(async (value) => {
                const user = await WalkinPatient.findOne({ email: value });
                if (user) {
                    throw new Error('Email already exists.'); 
                }
                return true; 
            }),
        body('age')
            .isInt({ min: 0, max: 120 })
            .withMessage('Age must be between 0 and 120.'),
        body('gender')
            .isIn(['male', 'female', 'other'])
            .withMessage('Gender must be male, female, or other.')
    ];
};

module.exports = { addWalkinPatientsValidationRules };