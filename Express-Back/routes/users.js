var express = require('express');
var router = express.Router();

// CONTROLLERS
const user_controller = require('../controllers/userController');
const authentification_controller = require('../controllers/authentificationController')


/* GET user. */
// Get OWN profile info 
router.get('/myinfo', authentification_controller.validate_accessToken, user_controller.get_own_profile_info);
// Get ANOTHER profile info 

/* POST new user. */
router.post('/', user_controller.create_new_user);

/* PUT OWN user. */
router.put('/myinfo', authentification_controller.validate_accessToken, user_controller.update_user);

/* DELETE user. */
router.delete('/', user_controller.delete_user);



module.exports = router;
