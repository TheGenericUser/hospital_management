const express = require('express');
const multer = require('multer');

const { emailValidator } = require('../../../../middleware/emailValidator');
const { fileValidator } = require('../../../../middleware/admin/fileValidator');
const { updateWalkinPatientsValidationRules } = require('../../../../validators/admin/updateValidators/updateWalkinPatientsValidator');
const { updateWalkinPatients } = require('../../../../controllers/admin/updateControllers/updateWalkinPatientsController');
const adminUpdateWalkinPatientsRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

adminUpdateWalkinPatientsRouter.post('/', upload.any('report'), emailValidator, updateWalkinPatientsValidationRules(), fileValidator, updateWalkinPatients);

module.exports = { adminUpdateWalkinPatientsRouter };