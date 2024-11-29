const express = require('express');
const { emailValidator } = require('../../../../middleware/emailValidator');
const { updateUsersValidationRules } = require('../../../../validators/admin/updateValidators/updateUsersValidator');
const { updateUsers } = require('../../../../controllers/admin/updateControllers/updateUsersController');
const adminUpdateUsersRouter = express.Router();

adminUpdateUsersRouter.post('/', emailValidator, updateUsersValidationRules(), updateUsers);

module.exports = { adminUpdateUsersRouter };