var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');
const authentification_controller = require('../controllers/authentificationController')


// LOGIN
router.post('/login', authentification_controller.login_user);

// Validate AccessToken 
router.post('/login', authentification_controller.validate_accessToken);


module.exports = router;