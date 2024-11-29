const express = require('express');
const { checkLoggedOut } = require('../../../middleware/checkLoggedOut')
const { emailVerificationCodeController } = require('../../../controllers/user/loginControllers/emailVerificationController');
const { codeValidationRules } = require('../../../validators/user/loginValidators/codeValidator');
const emailVerificationRouter = express.Router();


emailVerificationRouter.post('/', checkLoggedOut('/'), codeValidationRules('code') , emailVerificationCodeController);

module.exports = { emailVerificationRouter };