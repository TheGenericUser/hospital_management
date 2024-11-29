const { body } = require('express-validator');
const { Doctor } = require('../../../models/doctorModel');
const { Department } = require('../../../models/departmentModel');

const updateDoctorsValidationRules = () => {
    return [
        body('id')
            .custom(async (value) => {
                const doctor = await Doctor.findById(value);
                if (!doctor) {
                    throw new Error('Server Error.');
                }
                return true;
            }),
        body('name')
            .isString().withMessage('Invalid Name.')
            .isLength({ min: 1, max: 255 }).withMessage('Name must be between 1 and 255 characters long.')
            .trim(),
        body('email')
            .normalizeEmail(),
        body('mobile')
            .isString().withMessage('Invalid mobile number.')
            .matches(/^\d{8,10}$/).withMessage('Invalid mobile number.'),
        body('department')
            .isString().withMessage('Invalid Department.')
            .trim()
            .custom(async (value) => {
                const titleCasedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
                const department = await Department.findOne({ name: titleCasedValue });
                if (!department) {
                    throw new Error('Invalid Department'); 
                }
                return true;
            }),
        body('education')
            .isString().withMessage('Server Error')
            .custom((value) => {
                try {
                    value = JSON.parse(value);  // Parse the string into an array
                } catch (err) {
                    throw new Error('Server Error');
                }

                const isValid = value.every(item => 
                    typeof item === 'string' && item.length >= 1 && item.length <= 256
                );
                
                if (!isValid) {
                    throw new Error('Each degree must be a length between 1 and 256 characters.');
                }
                return true;
            }),
        body('language')
            .isString().withMessage('Server Error')
            .custom((value) => {
                try {
                    value = JSON.parse(value);  // Parse the string into an array
                } catch (err) {
                    throw new Error('Server Error');
                }
                const isValid = value.every(item => 
                    typeof item === 'string' && item.length >= 1 && item.length <= 256
                );
                
                if (!isValid) {
                    throw new Error('Each language must be a length between 1 and 256 characters.');
                }
                return true;
            }),
        body('award')
            .isString().withMessage('Server Error')
            .custom((value) => {
                try {
                    if(value === 'null') return true;
                    value = JSON.parse(value);  // Parse the string into an array
                } catch (err) {
                    throw new Error('Server Error');
                }
                const isValid = value.every(item => 
                    typeof item === 'string' && item.length >= 1 && item.length <= 256
                );
                
                if (!isValid) {
                    throw new Error('Each award must be a length between 1 and 256 characters.');
                }
                return true;
            }),
        body('timeSlot')
            .isString().withMessage('Server Error')
            .custom((value) => {
                try {
                    value = JSON.parse(value);  // Parse the string into an array
                } catch (err) {
                    throw new Error('Server Error');
                }
                value.forEach(item => {
                    if (typeof item !== 'object') {
                        throw new Error('Each time slot should be an object');
                    }

                    // Validate that each time slot has the right properties
                    if (!item.day || !['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(item.day)) {
                        throw new Error('Invalid day in time slot');
                    }

                    // Validate each time slot within the day
                    item.timeSlots.forEach(slot => {
                        if (!slot.startTime || !slot.endTime) {
                            throw new Error('Both start time and end time must be provided');
                        }

                        // Ensure times are in valid format
                        const start = new Date(`1970-01-01T${slot.startTime}:00Z`);
                        const end = new Date(`1970-01-01T${slot.endTime}:00Z`);

                        if (start >= end) {
                            throw new Error(`End time must be greater than start time for ${item.day}`);
                        }
                    });
                });

                // Check for time overlap within the same day
                value.forEach(daySlot => {
                    const sortedSlots = daySlot.timeSlots.sort((a, b) => {
                        const startA = new Date(`1970-01-01T${a.startTime}:00Z`);
                        const startB = new Date(`1970-01-01T${b.startTime}:00Z`);
                        return startA - startB; // Sort by start time
                    });

                    // Compare each time slot with the next to check for overlaps
                    for (let i = 0; i < sortedSlots.length - 1; i++) {
                        const currentSlot = sortedSlots[i];
                        const nextSlot = sortedSlots[i + 1];

                        const currentEnd = new Date(`1970-01-01T${currentSlot.endTime}:00Z`);
                        const nextStart = new Date(`1970-01-01T${nextSlot.startTime}:00Z`);

                        if (currentEnd > nextStart) {
                            throw new Error(`Time slots on ${daySlot.day} overlap. (${currentSlot.startTime}-${currentSlot.endTime} overlaps with ${nextSlot.startTime}-${nextSlot.endTime})`);
                        }
                    }
                });

                return true;
            })
    ];
};

module.exports = { updateDoctorsValidationRules };