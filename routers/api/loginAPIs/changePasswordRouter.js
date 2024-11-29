const express = require('express');
const { checkLoggedOut } = require('../../../middleware/checkLoggedOut')
const { changePasswordController } = require('../../../controllers/user/loginControllers/changePasswordController');
const { changePasswordValidationRules } = require('../../../validators/user/loginValidators/changePasswordValidator')

const changePasswordRouter = express.Router();


changePasswordRouter.post('/', checkLoggedOut('/'), changePasswordValidationRules(), changePasswordController);

module.exports = { changePasswordRouter };