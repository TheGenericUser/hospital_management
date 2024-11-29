const express = require('express');
const { emailValidator } = require('../../../../middleware/emailValidator');
const { addWalkinPatientsValidationRules } = require('../../../../validators/admin/addValidators/addWalkinPatientsValidator');
const { addWalkinPatients } = require('../../../../controllers/admin/addControllers/addWalkinPatientsController');
const adminAddWalkinPatientsRouter = express.Router();

adminAddWalkinPatientsRouter.post('/', emailValidator, addWalkinPatientsValidationRules(), addWalkinPatients);

module.exports = { adminAddWalkinPatientsRouter };