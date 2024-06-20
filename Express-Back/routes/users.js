var express = require('express');
var router = express.Router();

// CONTROLLERS
const user_controller = require('../controllers/userController');
const authentification_controller = require('../controllers/authentificationController')


/* GET user. */
// Get OWN profile info 
router.get('/myinfo', authentification_controller.validate_accessToken, user_controller.get_own_profile_info);
// Get ANOTHER profile info by UserName!!! 
router.get('/profile/findbyusername/:username', authentification_controller.validate_accessToken, user_controller.get_profile_info_by_username)
// Get ANOTHER profile info by ID!!! 
router.post('/profile/findbyids', authentification_controller.validate_accessToken, user_controller.get_multiple_profile_info_by_ids)



/* POST new user. */
router.post('/', user_controller.create_new_user);

/* PUT OWN user. */
// put own info
router.put('/myinfo', authentification_controller.validate_accessToken, user_controller.update_user);
// Create friend request
router.put('/addfriend', authentification_controller.validate_accessToken, user_controller.add_friend)
// Deelete friend request
router.put('/canceladdfriend', authentification_controller.validate_accessToken, user_controller.cancel_add_friend)
// Accept friend request
router.put('/acceptaddfriend', authentification_controller.validate_accessToken, user_controller.accept_add_friend )

/* DELETE user. */
router.delete('/', user_controller.delete_user);



module.exports = router;
