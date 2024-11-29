const express = require('express');
const { idValidationRules } = require('../../../validators/admin/idValidator');
const { updateWalkinPatient } = require('../../../controllers/admin/updatePageController/updateWalkinPatientController');
const updateWalkinPatientAdminRouter = express.Router();


updateWalkinPatientAdminRouter.get('/', idValidationRules(), updateWalkinPatient);

module.exports = { updateWalkinPatientAdminRouter };