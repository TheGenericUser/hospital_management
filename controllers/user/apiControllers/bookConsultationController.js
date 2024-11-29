const moment = require('moment');
const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');
const { OnlinePatient } = require('../../../models/onlinePatientModel');
const { Consultation } = require('../../../models/consultationModel');
const { setValue } = require('../../../services/memcachedClient');
const { setEncryptedCookie, getDecryptedCookie } = require('../../../services/userCookieService');


const bookConsultation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    try {
        const { doctorId, consultationDate, consultationTime, age, gender } = req.body;

        const [startTime, endTime] = consultationTime.split('_');
    
        const date = moment(consultationDate, 'DD/MM/YYYY').toDate(); // Convert to Date

        const userId = getDecryptedCookie(req);
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(400).json({ success: false, message: 'Invalid Id' });
        }
        
        if(age) user.age = age;
        if(gender) user.gender = gender;

        await user.save();

        let patient = await OnlinePatient.findOne({ userId: userId });

        if(!patient){
            patient = new OnlinePatient({
                userId,
            });
            await patient.save();
        }

        const sessionKey = `session:${user._id.toString()}`;
        const sessionData = {
            name: user.name,
            email: user.email,
            role: user.role,
            age: user.age,
            gender: user.gender,
        };

        setEncryptedCookie(res, user._id.toString(), 60*60*24*4)
        setValue(sessionKey, sessionData, 60*60*24*4);

        const consultation = new Consultation({
            doctorId,
            onlinePatientId: patient._id,
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

module.exports = { bookConsultation };