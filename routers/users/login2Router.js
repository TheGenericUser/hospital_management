const express = require('express');
const { checkLoggedOut } = require('../../middleware/checkLoggedOut')
const { login2View } = require('../../controllers/user/login2Controller')
const login2ViewRouter = express.Router();

login2ViewRouter.get('/', checkLoggedOut('/'), login2View);

module.exports = { login2ViewRouter };