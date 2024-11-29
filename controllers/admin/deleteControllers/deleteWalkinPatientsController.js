const { validationResult } = require('express-validator');

const { WalkinPatient } = require('../../../models/walkinPatientModel');
const { Consultation } = require('../../../models/consultationModel');

const deleteWalkinPatients= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: patientId } = req.body;

    try {
        const patient = await WalkinPatient.findByIdAndDelete(patientId);
        
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Server Error' });
        }
//also report and consultation. also in users?

        return res.status(200).json({ success: true, message: 'Patient deleted successfully' });
    }catch (error) {
        console.error('Error deleting patient:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { deleteWalkinPatients };