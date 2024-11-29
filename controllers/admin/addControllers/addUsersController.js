require('dotenv').config()

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');

const { manageDoctorProfile } = require('../../../services/manageDoctorProfile')


const addUsers = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0].msg;
        if (firstError === 'Email already exists.') {
            return res.status(409).json({ success: false, message: firstError });
        }
        return res.status(400).json({ success: false, message: firstError });
    }

    const { name, email, password } = req.body;
    let { role, age, gender } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ENCRYPTION_NUMBER));
        
        const userData = {
            name,
            email,
            password: hashedPassword,
            ...(role !== undefined && role !== null && role !== '' && !Number.isNaN(role) ? { role } : {}),
            ...(age !== undefined && age !== null && age !== '' && !Number.isNaN(age) ? { age } : {}),
            ...(gender !== undefined && gender !== null && gender !== '' && !Number.isNaN(gender) ? { gender } : {})
        };

        const user = new User(userData);
        await user.save();

        manageDoctorProfile(user._id, role);
        
        return res.status(201).json({ success: true, message: 'User account successfully made!' });
    }catch (error) {
        console.error('Error making an account:', error);
    
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { addUsers };