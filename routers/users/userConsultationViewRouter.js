const express = require('express');
const { checkLoginAndRole } = require('../../middleware/checkLoginAndRole');
const { userConsultationView } = require('../../controllers/user/userConsultationViewController')
const userConsultationViewRouter = express.Router();

userConsultationViewRouter.get('/', checkLoginAndRole(['admin', 'staff', 'user'], '/login', '/'), userConsultationView);

module.exports = { userConsultationViewRouter };