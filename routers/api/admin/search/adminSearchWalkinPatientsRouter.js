const express = require('express');
const { searchWalkinPatientsValidationRules } = require('../../../../validators/admin/searchValidators/searchWalkinPatientsValidator');
const { searchWalkinPatients } = require('../../../../controllers/admin/searchControllers/searchWalkinPatientsController');
const adminSearchWalkinPatientsRouter = express.Router();

adminSearchWalkinPatientsRouter.get('/', searchWalkinPatientsValidationRules(), searchWalkinPatients);

module.exports = { adminSearchWalkinPatientsRouter };