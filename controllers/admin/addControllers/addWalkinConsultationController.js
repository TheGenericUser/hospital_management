const moment = require('moment');
const { validationResult } = require('express-validator');

const { WalkinPatient } = require('../../../models/walkinPatientModel');
const { Consultation } = require('../../../models/consultationModel');


const addWalkinConsultation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    try {
        const { id: doctorId, patientId, consultationDate, consultationTime } = req.body;

        // Step 2: Split the consultationTime into startTime and endTime
        const [startTime, endTime] = consultationTime.split('_');
    
        // Step 3: Convert the consultationDate to a Date object
        const date = moment(consultationDate, 'DD/MM/YYYY').toDate(); // Convert to Date

        const patient = await WalkinPatient.findById(patientId);

        const consultation = new Consultation({
            doctorId,
            walkinPatientId: patient._id,
            consultationTime: {
                date,        
                startTime,   
                endTime,    
            },
            status: 'scheduled',
        });
    
        await consultation.save();
    
        patient.consultationId = consultation._id;
    
        await patient.save();
    
        return res.status(201).json({ success: true, message: 'Consultation booked!' });
    }catch (error) {
        console.error('Error making consultation:', error);
    
        return res.status(500).json({ success: false, message: 'Error making consultation.' });      
    }
};

module.exports = { addWalkinConsultation };