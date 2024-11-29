const express = require('express');
const { deleteDepartmentsValidationRules } = require('../../../../validators/admin/deleteValidators/deleteDepartmentsValidator');
const { deleteDepartments } = require('../../../../controllers/admin/deleteControllers/deleteDepartmentsController');
const adminDeleteDepartmentsRouter = express.Router();

adminDeleteDepartmentsRouter.post('/', deleteDepartmentsValidationRules(), deleteDepartments);

module.exports = { adminDeleteDepartmentsRouter };