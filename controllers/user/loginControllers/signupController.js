const jwt = require('jsonwebtoken');

const { setValue, getValue } = require('../../../services/memcachedClient');
const { sendEmail } = require('../../../utils/emailUtils')
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
        if (firstError && firstError.msg === 'Email already exists.') {
            return res.status(409).json({ success: false, message: firstError.msg });
        }
        return res.status(400).json({ success: false, message: firstError.msg });
    }

    const { name, email, password } = req.body;
    let code;

    try {
        const key = `email_verification:${email}`
        const result = await getValue(key);
        if (!result || result.remainingTTL < 60) {
            code = Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
            const details = {
                name: name,
                password: password,
                code: code
            };
            await setValue(key, details, 60 * 10);
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
            res.cookie('auth', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 10 * 60 * 1000,
                sameSite: 'Strict'
            });
        }else{
            const { value } = result;
            code = value['code'];
        }
        console.log(code);
        // await sendEmail(email, 'Email Verification', name, code, 'email_verification');
        return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { signup };