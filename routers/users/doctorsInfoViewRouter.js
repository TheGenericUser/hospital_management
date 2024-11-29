const express = require('express');
const { doctorsInfoValidator } = require('../../validators/user/doctorsInfoValidator')
const { doctorsInfoView } = require('../../controllers/user/doctorsInfoViewController')
const doctorsInfoViewRouter = express.Router();

doctorsInfoViewRouter.get('/:doctorId?', doctorsInfoValidator(), doctorsInfoView);

module.exports = { doctorsInfoViewRouter };