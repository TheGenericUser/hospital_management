const express = require('express');
const { updateDepartmentsValidationRules } = require('../../../../validators/admin/updateValidators/updateDepartmentsValidator');
const { updateDepartments } = require('../../../../controllers/admin/updateControllers/updateDepartmentsController');
const adminUpdateDepartmentsRouter = express.Router();

adminUpdateDepartmentsRouter.post('/', updateDepartmentsValidationRules(), updateDepartments);

module.exports = { adminUpdateDepartmentsRouter };