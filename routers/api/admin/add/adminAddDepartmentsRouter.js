const express = require('express');
const { addDepartmentValidationRules } = require('../../../../validators/admin/addValidators/addDepartmentsValidator');
const { addDepartments } = require('../../../../controllers/admin/addControllers/addDepartmentsController');
const adminAddDepartmentsRouter = express.Router();

adminAddDepartmentsRouter.post('/', addDepartmentValidationRules(), addDepartments);

module.exports = { adminAddDepartmentsRouter };