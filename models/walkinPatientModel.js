const mongoose = require('mongoose');
const { Schema } = mongoose;

const walkinPatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    labReportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
    consultationId :{
        type: Schema.Types.ObjectId,
        ref: 'Consultation',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 256,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
    },
    gender: { 
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
}, { timestamps: true });

const WalkinPatient = mongoose.model('WalkinPatient', walkinPatientSchema);

module.exports = { WalkinPatient };