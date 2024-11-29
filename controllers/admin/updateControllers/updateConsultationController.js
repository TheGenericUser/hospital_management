const { validationResult } = require('express-validator');

const { Consultation } = require('../../../models/consultationModel');

const updateConsultation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: consultationId, status } = req.body;

    try {
        const consultation = await Consultation.findById(consultationId);
        
        consultation.status = status;

        await consultation.save();
        
        return res.status(200).json({ success: true, message: 'Consultation status changed!' });
    }catch (error) {
        console.error('Error updating status:', error);    
        return res.status(500).json({ success: false, message: 'Error updating status.' });      
    }
};

module.exports = { updateConsultation };