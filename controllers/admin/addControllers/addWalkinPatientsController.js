const { validationResult } = require('express-validator');

const { WalkinPatient } = require('../../../models/walkinPatientModel');

const addWalkinPatients = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        if (firstError === 'Email already exists.') {
            return res.status(409).json({ success: false, message: firstError });
        }
        return res.status(400).json({ success: false, message: firstError });
    }

    const { name, email, age, gender } = req.body;

    try {        
        const walkinPatientData = {
            name,
            email,
            age,
            gender
        };

        const patient = new WalkinPatient(walkinPatientData);
        await patient.save();
        
        return res.status(201).json({ success: true, message: 'Account successfully made!' });
    }catch (error) {
        console.error('Error making an account:', error);
    
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { addWalkinPatients };