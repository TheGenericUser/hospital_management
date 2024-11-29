const express = require('express');
const { checkLoggedOut } = require('../../../middleware/checkLoggedOut')
const { emailValidator } = require('../../../middleware/emailValidator');
const { forgetPasswordValidationRules } = require('../../../validators/user/loginValidators/forgertPasswordValidator')
const { forgetPasswordController } = require('../../../controllers/user/loginControllers/forgetPasswordController');
const forgetPasswordRouter = express.Router();

forgetPasswordRouter.post('/', checkLoggedOut('/'), emailValidator, forgetPasswordValidationRules(), forgetPasswordController);

module.exports = { forgetPasswordRouter };