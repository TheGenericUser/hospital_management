const express = require('express');
const { checkLoggedOut } = require('../../middleware/checkLoggedOut')
const { loginView } = require('../../controllers/user/loginController')
const loginViewRouter = express.Router();

loginViewRouter.get('/', checkLoggedOut('/'), loginView);

module.exports = { loginViewRouter };