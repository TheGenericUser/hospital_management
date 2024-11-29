const express = require('express');
const { walkinPatientAdminController } = require('../../controllers/admin/walkinPatientAdminController');

const walkinPatientAdminRouter = express.Router();


walkinPatientAdminRouter.get('/', walkinPatientAdminController);

module.exports = { walkinPatientAdminRouter };