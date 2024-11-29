const moment = require('moment'); // For date manipulation
const { body } = require('express-validator');
const { Doctor } = require('../../../models/doctorModel');

const bookConsultationValidationRules = () => {
    return [
        body('doctorId')
            .custom(async (value) => {
                const doctor = await Doctor.findById(value);
                if(!doctor){
                    throw new Error('Invalid Id');
                }
                return true;
            }),
        body('age')
            .optional({ nullable: true, checkFalsy: true })
            .isInt({ min: 0, max: 120 })
            .withMessage('Age must be between 0 and 120.'),
        body('gender')
            .optional({ nullable: true, checkFalsy: true })
            .isIn(['male', 'female', 'other'])
            .withMessage('Gender must be male, female, or other.'),
        body('consultationDate')
            .isString() // Ensure it's a string
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
            .withMessage('Consultation date must be in the format dd/mm/yyyy'),
        body('consultationTime')
            .isString() // Ensure it's a string
            .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])_([01]?[0-9]|2[0-3]):([0-5][0-9])$/)
            .withMessage('Consultation time must be in the format hh:mm_hh:mm (24-hour format)')
            .custom(async (value, {req}) => {
                const consultationDate = req.body.consultationDate;
                const [startTime, endTime] = value.split('_');
                // Step 1: Calculate the day of the week from the consultationDate (dd/mm/yyyy)
                const dayOfWeek = moment(consultationDate, 'DD/MM/YYYY').format('dddd'); // Get the full weekday name (e.g., 'Monday')

                // Step 2: Look up the doctor by ID from the body
                const doctorId = req.body.doctorId;
                const doctor = await Doctor.findById(doctorId).populate('timeslotId');

                if (!doctor || !doctor.timeslotId) {
                    throw new Error('Doctor or timeslot not found');
                }

                const timeslot = doctor.timeslotId.availability.find(slot => slot.day === dayOfWeek);
                console.log(timeslot);
                if (!timeslot) {
                    throw new Error(`No availability found for ${dayOfWeek}`);
                }

                // Step 4: Check if the consultation time falls within any of the available time slots for that day
                const timeSlotIsValid = timeslot.timeSlots.some((slot) => {
                    // const [slotStart, slotEnd] = [slot.startTime, slot.endTime].map((time) => moment(time, 'HH:mm'));
                    // const [inputStart, inputEnd] = [startTime, endTime].map((time) => moment(time, 'HH:mm'));
                
                    return slot.startTime === startTime && slot.endTime === endTime;
                    // Check if input time falls within the available slot
                    // return inputStart.isBetween(slotStart, slotEnd, null, '[)') && inputEnd.isBetween(slotStart, slotEnd, null, '(]');
                });
              
                if (!timeSlotIsValid) {
                    throw new Error('Consultation time is not within the available time slot');
                }
                return true;
            })

    ];
};

module.exports = { bookConsultationValidationRules };