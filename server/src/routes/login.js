const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { autorizar } = require('../auth/auth');

router.post('/', loginController.login);
router.get('/', autorizar, loginController.getAuth);

module.exports = router;