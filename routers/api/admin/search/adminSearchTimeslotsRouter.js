const express = require('express');
const { idValidationRules } = require('../../../../validators/admin/idValidator');
const { searchTimeslots } = require('../../../../controllers/admin/searchControllers/searchTimeslotsController');
const adminSearchTimeslotsRouter = express.Router();

adminSearchTimeslotsRouter.get('/', idValidationRules(), searchTimeslots);

module.exports = { adminSearchTimeslotsRouter };