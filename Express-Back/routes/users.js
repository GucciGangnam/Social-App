var express = require('express');
var router = express.Router();

// CONTROLLERS
const user_controller = require('../controllers/userController');
const authentification_controller = require('../controllers/authentificationController')


/* GET user. */
router.get('/', user_controller.read_user);

/* POST new user. */
router.post('/', user_controller.create_new_user);

/* PUT user. */
router.put('/', user_controller.put_user);

/* DELETE user. */
router.delete('/', user_controller.delete_user);



module.exports = router;
