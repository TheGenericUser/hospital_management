const mongoose = require('mongoose');
const { Schema } = mongoose;

const consultationSchema  = new mongoose.Schema({
    walkinPatientId: { 
        type: Schema.Types.ObjectId,
        ref: 'WalkinPatient',
    },
    onlinePatientId: { 
        type: Schema.Types.ObjectId,
        ref: 'OnlinePatient',
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    consultationTime:{
        date:{
            type: Date,
        },
        startTime: { 
            type: String
        },
        endTime: { 
            type: String 
        },
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
        required: true,
    },
}, { timestamps: true });

consultationSchema.pre('save', function(next) {
    // Ensure that only one of walkinPatientId or onlinePatientId is set
    if (this.walkinPatientId && this.onlinePatientId) {
      const error = new Error('A consultation can either have a walk-in or an online patient, not both.');
      return next(error); // Return an error and prevent saving the document
    }
  
    // Ensure that at least one of walkinPatientId or onlinePatientId is set
    if (!this.walkinPatientId && !this.onlinePatientId) {
      const error = new Error('A consultation must have either a walk-in or an online patient.');
      return next(error); // Return an error and prevent saving the document
    }
  
    next(); // Proceed with saving if validation passes
});

const Consultation = mongoose.model('Consultation', consultationSchema );

module.exports = { Consultation };