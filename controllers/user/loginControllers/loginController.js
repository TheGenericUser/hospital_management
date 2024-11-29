// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const { User } = require('../../../models/userModel');
const { setValue } = require('../../../services/memcachedClient');
const { setEncryptedCookie } = require('../../../services/userCookieService');
// const { generateSecureToken } = require('../../../utils/generateToken')

const login = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password, rememberMe } = req.body;
    try {

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // req.session['userId'] = user._id.toString();

        // const rememberToken = rememberMe ? generateSecureToken(64) : null;

        const sessionKey = `session:${user._id.toString()}`;
        const sessionData = {
            name: user.name,
            email: user.email,
            role: user.role,
            ...(user.age && { age: user.age }),
            ...(user.gender && { gender: user.gender })

            // rememberToken: rememberToken,
            // sessionId: req.session.id
        };

        // user.remember_me = rememberToken;
        user.activeSession = req.session.id;
        await user.save(); 

        if(rememberMe){
            // const token = jwt.sign({ rememberToken }, process.env.JWT_SECRET, { expiresIn: '14d' });
            // res.cookie(process.env.REMEMBER_ME, token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production', 
            //     maxAge: 14 * 24 * 60 * 60 * 1000,
            //     sameSite: 'Strict'
            // });
            setEncryptedCookie(res, user._id.toString(), 60*60*24*28)
            setValue(sessionKey, sessionData, 60*60*24*28);
        }else {
            setEncryptedCookie(res, user._id.toString(), 60*60*24*4)
            setValue(sessionKey, sessionData, 60*60*24*4);
        }

        res.status(200).json({ success: true, message: 'Login successful', userId: user._id });
    }catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server Error.' });
    }
};

module.exports = { login };