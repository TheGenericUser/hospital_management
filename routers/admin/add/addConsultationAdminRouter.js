const express = require('express');
const { idValidationRules } = require('../../../validators/admin/idValidator');
const { addConsultation } = require('../../../controllers/admin/addPageController/addConsultationController');
const addConsultationAdminRouter = express.Router();


addConsultationAdminRouter.get('/', idValidationRules(), addConsultation);

module.exports = { addConsultationAdminRouter };