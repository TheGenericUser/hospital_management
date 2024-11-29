require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');
const { deleteValue } = require('../../../services/memcachedClient');
const { sendEmail } = require('../../../utils/emailUtils')

const changePasswordController  = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    
    const { new_password: password } = req.body;
    const jwtCookie = req.cookies[process.env.ACCOUNT_RECOVERY_CODE];
    
    if (!jwtCookie) {
        console.log('No cookie found');
        return res.status(401).json({ success: false, message: 'Server Error.' });
    }

    let email;
    try {
        email = jwt.verify(jwtCookie, process.env.JWT_SECRET).email;
    } catch (err) {
        console.error(err);
        return res.status(403).json({ success: false, message: 'Server Error.' });
    }

    try {
        const key = `account_recovery:${email}`

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ENCRYPTION_NUMBER));

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new Error('User not found');
        }
        
        user.password = hashedPassword;
        user.updatedAt = Date.now();
        await user.save();
        
        deleteValue(key);
        res.clearCookie(process.env.ACCOUNT_RECOVERY_CODE);

        return res.status(200).json({ success: true, message: 'Password changed!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server Error.' });
    }
};

module.exports = { changePasswordController };