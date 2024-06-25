var express = require('express');
var router = express.Router();

// CONTROLLERS
const user_controller = require('../controllers/userController');
const authentification_controller = require('../controllers/authentificationController')
const event_controller = require('../controllers/eventController')

// /* CREATE NEW EVENT . */

router.post('/new', authentification_controller.validate_accessToken, event_controller.create_new_event);

// GET ALL EVENTS 
router.get('/', authentification_controller.validate_accessToken, event_controller.get_all_events);

// GET SINGLE EVENT
router.get('/get/single/event/:id', authentification_controller.validate_accessToken, event_controller.get_single_event);

// DELETE SINGLE EVENT
router.delete('/cancel/event', authentification_controller.validate_accessToken, event_controller.cancel_event);

// PUT JOIN EVENT
router.put('/join/event', authentification_controller.validate_accessToken, event_controller.join_event);

// PUT JOIN EVENT
router.put('/leave/event', authentification_controller.validate_accessToken, event_controller.leave_event);


module.exports = router;