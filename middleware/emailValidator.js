const dns = require('dns');
const validator = require('validator');
const { deleteImage } = require('../services/deleteImage')

const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    const domain = email.split('@')[1];

    return new Promise((resolve) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                resolve({ valid: false, error: 'Domain does not have valid MX records' });
            } else {
                resolve({ valid: true });
            }
        });
    });
};

const emailValidator = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        if(req.filepath){
            deleteImage(req.filepath);
        }
        return res.status(400).json({error: true, message: 'Email is required' });
    }

    const emailValidation = await validateEmail(email);

    if (!emailValidation.valid) {
        if(req.filepath){
            deleteImage(req.filepath);
        }
        return res.status(400).json({error: true, message: 'Invalid Email' });
    }

    next();
};

module.exports = {emailValidator};