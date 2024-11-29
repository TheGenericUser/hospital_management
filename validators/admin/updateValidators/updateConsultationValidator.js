const { body } = require('express-validator');
const { Consultation } = require('../../../models/consultationModel');

const updateConsultationValidationRules = () => {
    return [
        body('id')
            .custom(async (value) => {
                const consultation = await Consultation.findById(value);
                console.log(consultation)
                if (!consultation) {
                    throw new Error('Invalid Id.');
                }
                return true;
            }),
        body('status')
            .isIn(['scheduled', 'completed', 'cancelled'])
            .withMessage('Status must be one of the following: scheduled, completed, cancalled.'),
    ];
};

module.exports = { updateConsultationValidationRules };