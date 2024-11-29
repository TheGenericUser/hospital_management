const express = require('express');
const { checkLoggedOut } = require('../../../middleware/checkLoggedOut')
const { accountRecoveryController } = require('../../../controllers/user/loginControllers/accountRecoveryController');
const { codeValidationRules } = require('../../../validators/user/loginValidators/codeValidator');
const accountRecoveryRouter = express.Router();


accountRecoveryRouter.post('/', checkLoggedOut('/'), codeValidationRules('recoveryCode'), accountRecoveryController);

module.exports = { accountRecoveryRouter };