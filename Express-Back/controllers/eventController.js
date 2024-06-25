// IMPORTS //
// Async handler
const asyncHandler = require("express-async-handler");
// Validator methods
const { body, validationResult } = require("express-validator");
// UUID v4
const { v4: uuidv4 } = require('uuid');
// Bcrypt
const bcrypt = require('bcryptjs');
// Import JWT
const jwt = require("jsonwebtoken");

// SCHEMES
const User = require("../models/user")
const Event = require("../models/event")




// CONTROLLER
// create new ever
exports.create_new_event = asyncHandler(async (req, res, next) => {
    try {
        // Find the admin user by ID
        const admin = await User.findOne({ 'PERSONAL_INFO.ID': req.userID });
        if (!admin) {
            return res.status(403).json({ msg: 'Admin user not found' });
        }

        // Extract event details from the request body
        const { eventTitle, eventIMG, eventInfo, eventPrivacyPreference, eventStartTime } = req.body;
        const invitees = admin.MAIN_DATA.CONTACTS;

        // Validate required fields
        if (!eventTitle || !eventPrivacyPreference || !eventStartTime) {
            console.log(eventTitle, eventPrivacyPreference, eventStartTime)
            return res.status(400).json({ msg: 'All fields are required' });

        }

        // Create new event
        const newEvent = new Event({
            PUBLIC_DATA: {
                EVENT_TITLE: eventTitle,
                EVENT_IMG: eventIMG,
                EVENT_INFO: eventInfo,
                EVENT_PRIVACY_PREFERENCE: eventPrivacyPreference,
                EVENT_ADMIN: admin.ID,
                EVENT_INVITEE_LIST: invitees,
                EVENT_ATTENDEE_LIST: admin.ID,
                EVENT_START_TIME: eventStartTime,

            },
        });

        // Save the event to the database
        await newEvent.save();

        // Respond with the created event
        return res.status(201).json({ msg: 'Event created successfully', event: newEvent });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// Get all events
exports.get_all_events = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.userId;

        // Find events where the user is an invitee or attendee
        const inviteeEvents = await Event.find({ 'PUBLIC_DATA.EVENT_INVITEE_LIST': userId });
        const attendeeEvents = await Event.find({ 'PUBLIC_DATA.EVENT_ATTENDEE_LIST': userId });

        // Merge the two lists and remove duplicates
        const allEvents = [...inviteeEvents, ...attendeeEvents];
        const uniqueEvents = Array.from(new Set(allEvents.map(event => event._id.toString())))
            .map(id => allEvents.find(event => event._id.toString() === id));

        // Return the unique events
        return res.status(200).json({ events: uniqueEvents });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// Get single Event 
exports.get_single_event = asyncHandler(async (req, res, next) => {
    try {
        const eventID = req.params.id;
        
        // Validate the eventID if necessary (e.g., check if it's a valid MongoDB ObjectID)
        if (!eventID.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid Event ID' });
        }

        const eventOBJ = await Event.findById(eventID);

        if (!eventOBJ) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json({ event: eventOBJ });
    } catch (error) {
        console.error(`Error fetching event: ${error.message}`);
        return res.status(500).json({ message: 'Server Error' });
    }
});

// CANCEL EVENT 
exports.cancel_event = asyncHandler(async (req, res, next) => { 
    const userID = req.userId; // Assuming userId is set in the request, adjust as per your authentication setup
    const eventID = req.body.eventID;

    console.log(userID)
    console.log(eventID)

    try {
        // Find the event by ID
        const event = await Event.findOne({_id : eventID});
        console.log(event)

        // Check if event exists
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if the current user has permission to delete the event
        if (userID !== event.PUBLIC_DATA.EVENT_ADMIN) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        // Delete the event
        await event.deleteOne(); // Use deleteOne() instead of remove()

        return res.status(200).json({ msg: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

// JOIN EVENT 
exports.join_event = asyncHandler(async (req, res, next) => { 
    const userID = req.userId; // Assuming userId is set in the request, adjust as per your authentication setup
    const eventID = req.body.eventID;

    try {
        // Find the event by ID
        const event = await Event.findOne({ _id: eventID });

        // Check if event exists
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if user is already in the attendee list
        if (event.PUBLIC_DATA.EVENT_ATTENDEE_LIST.includes(userID)) {
            return res.status(400).json({ msg: 'User already joined the event' });
        }

        // Update attendee list
        event.PUBLIC_DATA.EVENT_ATTENDEE_LIST.push(userID);

        // Save the updated event
        await event.save();

        return res.status(200).json({ msg: 'Event joined successfully' });
    } catch (error) {
        console.error('Error joining event:', error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});

// LEAVE EVENT 
exports.leave_event = asyncHandler(async (req, res, next) => { 
    const userID = req.userId; // Assuming userId is set in the request, adjust as per your authentication setup
    const eventID = req.body.eventID;

    try {
        // Find the event by ID
        const event = await Event.findOne({ _id: eventID });

        // Check if event exists
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Ensure PUBLIC_DATA and ATTENDEE_LIST are defined
        if (!event.PUBLIC_DATA || !Array.isArray(event.PUBLIC_DATA.EVENT_ATTENDEE_LIST)) {
            return res.status(400).json({ msg: 'Invalid event data' });
        }

        // Check if user is in the attendee list
        const attendeeIndex = event.PUBLIC_DATA.EVENT_ATTENDEE_LIST.indexOf(userID);
        if (attendeeIndex === -1) {
            return res.status(400).json({ msg: 'User not in attendee list' });
        }

        // Remove user from the attendee list
        event.PUBLIC_DATA.EVENT_ATTENDEE_LIST.splice(attendeeIndex, 1);

        // Save the updated event
        await event.save();

        return res.status(200).json({ msg: 'Left event successfully' });
    } catch (error) {
        console.error('Error leaving event:', error);
        return res.status(500).json({ msg: 'Server Error' });
    }
});
