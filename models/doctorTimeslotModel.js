const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    availability: [
        {
            day: {
                type: String, 
                required: true, 
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
            timeSlots: [
                {
                    startTime: { type: String },
                    endTime: { type: String },
                },
            ],
        },
    ],
});

const Timeslot = mongoose.model('Timeslot', timeslotSchema);

module.exports = { Timeslot };