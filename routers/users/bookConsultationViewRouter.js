const express = require('express');
const { checkLoginAndRole } = require('../../middleware/checkLoginAndRole');
const { bookConsultationValidator } = require('../../validators/user/bookConsultationValidator')
const { bookConsultationView } = require('../../controllers/user/bookConsultationViewController')
const bookConsultationViewRouter = express.Router();

bookConsultationViewRouter.get('/:doctorId?', checkLoginAndRole(['admin', 'staff', 'user'], '/login', '/'), bookConsultationValidator(), bookConsultationView);

module.exports = { bookConsultationViewRouter };