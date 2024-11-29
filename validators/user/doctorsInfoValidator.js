const { param } = require('express-validator');
const { Doctor } = require('../../models/doctorModel');

const doctorsInfoValidator = () => {
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

module.exports = { doctorsInfoValidator };