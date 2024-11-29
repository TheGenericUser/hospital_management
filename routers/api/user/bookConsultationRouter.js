const express = require('express');
const { bookConsultationValidationRules } = require('../../../validators/user/apiValidators/bookConsultationValidator');
const { bookConsultation } = require('../../../controllers/user/apiControllers/bookConsultationController');
const bookConsultationRouter = express.Router();

bookConsultationRouter.post('/', bookConsultationValidationRules(), bookConsultation);

module.exports = { bookConsultationRouter };