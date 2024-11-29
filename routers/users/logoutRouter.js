const express = require('express');
const { checkLoginAndRole } = require('../../middleware/checkLoginAndRole')
const { logout } = require('../../controllers/user/logoutController')
const logoutRouter = express.Router();

logoutRouter.get('/', checkLoginAndRole(['user', 'staff', 'admin'], '/', '/'), logout);

module.exports = { logoutRouter };