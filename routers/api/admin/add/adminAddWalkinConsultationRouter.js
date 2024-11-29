const express = require('express');
const { addWalkinConsultationValidationRules } = require('../../../../validators/admin/addValidators/addWalkinConsultationValidator');
const { addWalkinConsultation } = require('../../../../controllers/admin/addControllers/addWalkinConsultationController');
const adminAddWalkinConsultationRouter = express.Router();

adminAddWalkinConsultationRouter.post('/', addWalkinConsultationValidationRules(), addWalkinConsultation);

module.exports = { adminAddWalkinConsultationRouter };