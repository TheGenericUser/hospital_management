const express = require('express');
const { onlinePatientAdminController } = require('../../controllers/admin/onlinePatientAdminController');

const onlinePatientAdminRouter = express.Router();


onlinePatientAdminRouter.get('/', onlinePatientAdminController);

module.exports = { onlinePatientAdminRouter };