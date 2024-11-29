const express = require('express');
const { departmentAdminController } = require('../../controllers/admin/departmentAdminController');
const { pageValidator } = require('../../middleware/admin/pageValidator')
const { Department } = require('../../models/departmentModel')

const departmentAdminRouter = express.Router();

departmentAdminRouter.get('/:page?', pageValidator(Department, process.env.DEPARTMENT_PAGINATION_LIMIT), departmentAdminController);

module.exports = { departmentAdminRouter };