const express = require('express');
const { emailValidator } = require('../../../../middleware/emailValidator');
const { addUsersValidationRules } = require('../../../../validators/admin/addValidators/addUsersValidator');
const { addUsers } = require('../../../../controllers/admin/addControllers/addUsersController');
const adminAddUsersRouter = express.Router();

adminAddUsersRouter.post('/', emailValidator, addUsersValidationRules(), addUsers);

module.exports = { adminAddUsersRouter };