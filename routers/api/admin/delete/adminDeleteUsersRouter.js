const express = require('express');
const { deleteUsersValidationRules } = require('../../../../validators/admin/deleteValidators/deleteUsersValidator');
const { deleteUsers } = require('../../../../controllers/admin/deleteControllers/deleteUsersController');
const adminDeleteUsersRouter = express.Router();

adminDeleteUsersRouter.post('/', deleteUsersValidationRules(), deleteUsers);

module.exports = { adminDeleteUsersRouter };