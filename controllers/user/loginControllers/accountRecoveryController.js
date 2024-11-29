const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { getValue } = require('../../../services/memcachedClient');

const accountRecoveryController  = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array()[0].msg });
    }

    const { recoveryCode: code } = req.body;
    const jwtCookie = req.cookies[process.env.ACCOUNT_RECOVERY_CODE];    
    
    if (!jwtCookie) {
        console.log('No cookie found');
        return res.status(401).json({ success: false, message: 'Server Error' });
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
        const result = await getValue(key);
        if (!result) {
            return res.status(500).json({ success: false, message: 'Server Error.' });
        }
        const { value } = result;
        const { code: accountRecoveryCode } = value;
        
        if (code !== accountRecoveryCode) {
            return res.status(400).json({ success: false, message: 'Incorrect code.' });
        }
        return res.status(200).json({ success: true, message: 'Valid Code!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server Error.' });
    }
};

module.exports = { accountRecoveryController };