const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');
const { deleteValue } = require('../../../services/memcachedClient');
const { manageDoctorProfile } = require('../../../services/manageDoctorProfile')

const updateUsers= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: userId, name, email, password, role, age, gender } = req.body;

    try {
        const user = await User.findById(userId).select('+password');

        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = (password && password.trim() !== '') ? bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ENCRYPTION_NUMBER)) : null;
        
        user.name = name;
        user.email = email;
        if(hashedPassword) user.password = hashedPassword;
        if(role) user.role = role;
        if(age) user.age = age;
        if(gender) user.gender = gender;
        user.remember_me = null;
        user.activeSession = null;
        user.updatedAt = Date.now();

        await user.save();
        
        manageDoctorProfile(user._id, role);

        const key = `session:${userId}`;
        
        deleteValue(key);

        return res.status(200).json({ success: true, message: 'User information changed!' });
    }catch (error) {
        console.error('Error updating user:', error);
    
        if (error.message === 'User not found') {
            return res.status(404).json({ success: false, message: 'Server Error' });
        }
        return res.status(500).json({ success: false, message: 'Server Error.' });      
    }
};

module.exports = { updateUsers };