const express = require('express');
const { checkLoggedOut } = require('../../../middleware/checkLoggedOut')
const { emailValidator } = require('../../../middleware/emailValidator');
const { signupValidationRules } = require('../../../validators/user/loginValidators/signupValidator');
const { signup } = require('../../../controllers/user/loginControllers/signupController');

const signupRouter = express.Router();

signupRouter.post('/', checkLoggedOut('/'), emailValidator, signupValidationRules(), signup);

module.exports = { signupRouter };