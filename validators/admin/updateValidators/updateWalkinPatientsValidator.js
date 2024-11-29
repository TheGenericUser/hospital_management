const { body } = require('express-validator');
const { WalkinPatient } = require('../../../models/walkinPatientModel');
const { Report } = require('../../../models/reportModel');

const updateWalkinPatientsValidationRules = () => {
    return [
        body('id')
            .custom(async (value) => {
                const patient = await WalkinPatient.findById(value);
                if (!patient) {
                    throw new Error('Server Error.');
                }
                return true;
            }),
        body('name')
            .isString().withMessage('Invalid Name.')
            .isLength({ min: 1, max: 255 }).withMessage('Name must be between 1 and 255 characters long.')
            .trim(),
        body('email')
            .normalizeEmail()
            .custom(async (value, { req }) => {
                const patient = await WalkinPatient.findById(req.body.id);
                    if (!patient) {
                        throw new Error('Server Error.');
                    }

                    const existingPatientWithEmail = await WalkinPatient.findOne({ email: value });
                    if (existingPatientWithEmail && existingPatientWithEmail._id.toString() !== patient._id.toString()) {
                        throw new Error('Email already exists for another patient.');
                    }
                return true; 
            }),
        body('age')
            .isInt({ min: 0, max: 120 })
            .withMessage('Age must be between 0 and 120.'),
        body('gender')
            .isIn(['male', 'female', 'other'])
            .withMessage('Gender must be male, female, or other.'),
        body('reportNumbers')
            .custom(async (value, { req } ) => {
                const patient = await WalkinPatient.findById(req.body.id);
                if (!patient) {
                    throw new Error('Server Error.');
                }
                const labReportId = req.body.labReportId;

                if ((patient.labReportId && labReportId == patient.labReportId)){

                    const report = await Report.findById(patient.labReportId);
                    if (!report) {
                        throw new Error('Server Error.');
                    }
                }
                return true;
            })
    ];
};

module.exports = { updateWalkinPatientsValidationRules };