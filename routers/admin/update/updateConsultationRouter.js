const express = require('express');
const { idValidationRules } = require('../../../validators/admin/idValidator');
const { updateConsultation } = require('../../../controllers/admin/updatePageController/updateConsultationController');
const updateConsultationRouter = express.Router();

updateConsultationRouter.get('/', idValidationRules(), updateConsultation);

module.exports = { updateConsultationRouter };