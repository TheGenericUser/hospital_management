const express = require('express');
const { searchOnlinePatientsValidationRules } = require('../../../../validators/admin/searchValidators/searchOnlinePatientsValidator');
const { searchOnlinePatients } = require('../../../../controllers/admin/searchControllers/searchOnlinePatientsController');
const adminSearchOnlinePatientsRouter = express.Router();

adminSearchOnlinePatientsRouter.get('/', searchOnlinePatientsValidationRules(), searchOnlinePatients);

module.exports = { adminSearchOnlinePatientsRouter };