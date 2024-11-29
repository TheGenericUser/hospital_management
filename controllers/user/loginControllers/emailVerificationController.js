require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');
const { getValue, deleteValue } = require('../../../services/memcachedClient');

const emailVerificationCodeController  = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        return res.status(400).json({ success: false, errors: firstError.msg });
    }

    const { code } = req.body;
    const jwtAuth = req.cookies.auth;

    if (!jwtAuth) {
        console.log('No auth cookie found');
        return res.status(401).json({ success: false, message: 'Server Error' });
    }

    let email;
    try {
        email = jwt.verify(jwtAuth, process.env.JWT_SECRET).email;
    } catch (err) {
        console.error(err);
        return res.status(403).json({ success: false, message: 'Server Error.' });
    }

    try {
        const key = `email_verification:${email}`
        const result = await getValue(key);
        if (!result) {
            return res.status(500).json({ success: false, message: 'Server Error.' });
        }
        const { value } = result;
        const { name, password, code: verificationCode } = value;

        if (code !== verificationCode) {
            return res.status(400).json({ success: false, message: 'Incorrect verification code.' });
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ENCRYPTION_NUMBER));

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        deleteValue(key);
        res.clearCookie('auth');
        
        return res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(409).json({ success:false, message: 'Email already exists.' });
        }
        return res.status(500).json({ success: false, message: 'Server Error.' });
    }
};

module.exports = { emailVerificationCodeController };