const express = require('express');
const { deleteWalkinPatientsValidationRules } = require('../../../../validators/admin/deleteValidators/deleteWalkinPatientsValidator');
const { deleteWalkinPatients } = require('../../../../controllers/admin/deleteControllers/deleteWalkinPatientsController');
const adminDeleteWalkinPatientsRouter = express.Router();

adminDeleteWalkinPatientsRouter.post('/', deleteWalkinPatientsValidationRules(), deleteWalkinPatients);

module.exports = { adminDeleteWalkinPatientsRouter };