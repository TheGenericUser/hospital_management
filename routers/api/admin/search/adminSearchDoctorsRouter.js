const express = require('express');
const { searchDoctorsValidationRules } = require('../../../../validators/admin/searchValidators/searchDoctorsValidator');
const { searchDoctors } = require('../../../../controllers/admin/searchControllers/searchDoctorsController');
const adminSearchDoctorsRouter = express.Router();

adminSearchDoctorsRouter.get('/', searchDoctorsValidationRules(), searchDoctors);

module.exports = { adminSearchDoctorsRouter };