const express = require('express');
const { searchUsersValidationRules } = require('../../../../validators/admin/searchValidators/searchUsersValidator');
const { searchUsers } = require('../../../../controllers/admin/searchControllers/searchUsersController');
const adminSearchUsersRouter = express.Router();

adminSearchUsersRouter.get('/', searchUsersValidationRules(), searchUsers);

module.exports = { adminSearchUsersRouter };