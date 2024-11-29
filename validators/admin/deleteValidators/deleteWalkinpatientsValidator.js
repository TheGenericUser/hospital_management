const { body } = require('express-validator');
const { WalkinPatient } = require('../../../models/walkinPatientModel');

const deleteWalkinPatientsValidationRules = () => {
    return [
        body('id')
            .custom(async (value) => {
                const patient = await WalkinPatient.findById(value);
                if (!patient) {
                    throw new Error('Server Error.');
                }
                return true;
            }),
    ];
};

module.exports = { deleteWalkinPatientsValidationRules };