const express = require('express');
const { checkLoginAndRole } = require('../../middleware/checkLoginAndRole');
const { reportsView } = require('../../controllers/user/reportsViewController')
const reportsViewRouter = express.Router();

reportsViewRouter.get('/', checkLoginAndRole(['admin', 'staff', 'user'], '/', '/'), reportsView);

module.exports = { reportsViewRouter };