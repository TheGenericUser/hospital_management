const mongoose = require('mongoose');
const { Schema } = mongoose

const doctorSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        default: null,
    },
    timeslotId: {
        type: Schema.Types.ObjectId,
        ref: 'Timeslot',
        required: true,
    },
    phoneNumber: {
        type: String,
        default: null,
        minlength: 8,
        maxlength: 10,
    },
    education: {
        type: [String],
        default: [],
    },
    languagesSpoken: {
        type: [String],
        default: [],
    },
    awards: {
        type: [String],
        default: null,
    },
    imagePath:{
        type: String
    }
}, { timestamps: true });


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Doctor };