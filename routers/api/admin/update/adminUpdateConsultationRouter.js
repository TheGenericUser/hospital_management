const express = require('express');
const { updateConsultationValidationRules } = require('../../../../validators/admin/updateValidators/updateConsultationValidator');
const { updateConsultation } = require('../../../../controllers/admin/updateControllers/updateConsultationController');
const adminUpdateConsultationRouter = express.Router();

adminUpdateConsultationRouter.post('/', updateConsultationValidationRules(), updateConsultation);

module.exports = { adminUpdateConsultationRouter };