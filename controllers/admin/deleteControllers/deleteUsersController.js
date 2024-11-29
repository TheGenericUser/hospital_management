require('dotenv').config()

const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');
const { deleteValue } = require('../../../services/memcachedClient');
const { manageDoctorProfile } = require('../../../services/manageDoctorProfile');
const { manageOnlinePatient } = require('../../../services/manageOnlinePatient');

const deleteUsers= async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { id: userId } = req.body;

    try {
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'Server Error' });
        }

        manageDoctorProfile(userId, '');
        const message = await manageOnlinePatient(userId);
        console.log(message);
        
        const key = `session:${userId}`;
        deleteValue(key);

        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    }catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { deleteUsers };