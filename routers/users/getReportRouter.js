const express = require('express');
const { reportLinkValidator } = require('../../middleware/reportLinkValidator');
const { Report } = require('../../models/reportModel');
const { getReport } = require('../../controllers/getReportController')
const { checkLoginAndRole } = require('../../middleware/checkLoginAndRole')

const getReportRouter = express.Router();

getReportRouter.get('/:reportId/:arrayIndex?', checkLoginAndRole(['user', 'staff', 'admin'], '/', '/'), 
reportLinkValidator(Report), getReport);

module.exports = { getReportRouter };