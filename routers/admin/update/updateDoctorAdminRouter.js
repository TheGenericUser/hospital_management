const express = require('express');
const { idValidationRules } = require('../../../validators/admin/idValidator');
const { updateDoctor } = require('../../../controllers/admin/updatePageController/updateDoctorController');
const updateDoctorAdminRouter = express.Router();


updateDoctorAdminRouter.get('/', idValidationRules(), updateDoctor);

module.exports = { updateDoctorAdminRouter };