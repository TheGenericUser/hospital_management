const express = require('express');
const { idValidationRules } = require('../../../validators/admin/idValidator');
const { updateOnlinePatient } = require('../../../controllers/admin/updatePageController/updateOnlinePatientController');
const updateOnlinePatientAdminRouter = express.Router();


updateOnlinePatientAdminRouter.get('/', idValidationRules(), updateOnlinePatient);

module.exports = { updateOnlinePatientAdminRouter };