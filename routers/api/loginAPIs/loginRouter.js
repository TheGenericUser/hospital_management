const express = require('express');
const { checkLoggedOut } = require('../../../middleware/checkLoggedOut')
const { emailValidator } = require('../../../middleware/emailValidator');
const { loginValidationRules } = require('../../../validators/user/loginValidators/loginValidator');
const { login } = require('../../../controllers/user/loginControllers/loginController');
const loginRouter = express.Router();

loginRouter.post('/', checkLoggedOut('/'), emailValidator, loginValidationRules(), login);

module.exports = { loginRouter };