const registerUser = require('../controllers/userController.js');

const phamvana = require('express');
const router = phamvana.Router();
router.route("/register").post(registerUser);