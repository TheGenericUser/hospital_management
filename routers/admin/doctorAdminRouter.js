const express = require('express');
const { doctorAdminController } = require('../../controllers/admin/doctorAdminController');
const doctorAdminRouter = express.Router();


doctorAdminRouter.get('/', doctorAdminController);

module.exports = { doctorAdminRouter };