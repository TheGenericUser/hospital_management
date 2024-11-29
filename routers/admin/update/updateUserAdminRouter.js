const express = require('express');
const { idValidationRules } = require('../../../validators/admin/idValidator');
const { updateUser } = require('../../../controllers/admin/updatePageController/updateUserController');
const updateUserAdminRouter = express.Router();


updateUserAdminRouter.get('/', idValidationRules(), updateUser);

module.exports = { updateUserAdminRouter };