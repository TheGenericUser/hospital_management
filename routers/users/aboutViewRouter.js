const express = require('express');
const { aboutView } = require('../../controllers/user/aboutViewController');
const aboutViewRouter = express.Router();

aboutViewRouter.get('/', aboutView);

module.exports = { aboutViewRouter };