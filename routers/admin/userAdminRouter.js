const express = require('express');
const { userAdminController } = require('../../controllers/admin/userAdminController');

const userAdminRouter = express.Router();

userAdminRouter.get('/', userAdminController);

module.exports = { userAdminRouter };