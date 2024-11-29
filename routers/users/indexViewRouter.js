const express = require('express');
const { indexView } = require('../../controllers/user/indexViewController')
const indexViewRouter = express.Router();

indexViewRouter.get('/', indexView);

module.exports = { indexViewRouter };