const express = require('express');
const multer = require('multer');

const { emailValidator } = require('../../../../middleware/emailValidator');
const { fileValidator } = require('../../../../middleware/admin/fileValidator');
const { updateOnlinePatientsValidationRules } = require('../../../../validators/admin/updateValidators/updateOnlinePatientsValidator');
const { updateOnlinePatients } = require('../../../../controllers/admin/updateControllers/updateOnlinePatientsController');
const adminUpdateOnlinePatientsRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

adminUpdateOnlinePatientsRouter.post('/', upload.any('report'), emailValidator, updateOnlinePatientsValidationRules(), fileValidator, updateOnlinePatients);

module.exports = { adminUpdateOnlinePatientsRouter };