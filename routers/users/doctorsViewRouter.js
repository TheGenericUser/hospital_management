const express = require('express');
const { doctorsView } = require('../../controllers/user/doctorsViewController')
const doctorsViewRouter = express.Router();

doctorsViewRouter.get('/', doctorsView);

module.exports = { doctorsViewRouter };