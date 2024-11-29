require('dotenv').config()

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { setValue, getValue} = require('../../../services/memcachedClient');
const { sendEmail } = require('../../../utils/emailUtils')

const forgetPasswordController  = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email } = req.body;

    let code = Math.floor(Math.random() * (99999999 - 11111111 + 1)) + 11111111;
    const key = `account_recovery:${email}`
    const result = await getValue(key);
    if (!result || result.remainingTTL < 60) {
        const details = {
            code: code
        };
        await setValue(key, details, 60 * 10);
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
        res.cookie(process.env.ACCOUNT_RECOVERY_CODE, token, {
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

    try {
        // await sendEmail(email, subject='Account Recovery', "", code, 'account_recovery');
        return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { forgetPasswordController };