const mongoose = require('mongoose');
const { Schema } = mongoose;

const onlinePatientSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    consultationId: {
        type: Schema.Types.ObjectId,
        ref: 'Consultation',
    },
    labReportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
    },
}, { timestamps: true });

const OnlinePatient = mongoose.model('OnlinePatient', onlinePatientSchema);

module.exports = { OnlinePatient };