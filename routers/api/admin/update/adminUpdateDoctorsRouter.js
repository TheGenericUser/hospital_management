const express = require('express');

const { emailValidator } = require('../../../../middleware/emailValidator');
const { uploadImage } = require('../../../../middleware/admin/doctorImage')
const { updateDoctorsValidationRules } = require('../../../../validators/admin/updateValidators/updateDoctorsValidator');
const { updateDoctors } = require('../../../../controllers/admin/updateControllers/updateDoctorsController');
const adminUpdateDoctorsRouter = express.Router();

adminUpdateDoctorsRouter.post('/', uploadImage('doctors'), emailValidator, updateDoctorsValidationRules(), updateDoctors);

module.exports = { adminUpdateDoctorsRouter };