const { param } = require('express-validator');
const { Doctor } = require('../../models/doctorModel');

const bookConsultationValidator = () => {
    return [
        param ('doctorId')
            .custom(async (value) => {
                const doctor = await Doctor.findById(value);
                if (!doctor) {
                    throw new Error('Invalid Id.');
                }
                return true;
            }),
    ];
};

module.exports = { bookConsultationValidator };