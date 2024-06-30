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
        const admin = await User.findOne({ ID: req.userId });
        if (!admin) {
            return res.status(403).json({ msg: 'Admin user not found' });
        }

        // Extract event details from the request body
        const { eventTitle, eventIMG, eventInfo, eventPrivacyPreference, eventStartTime, eventLocation } = req.body;
        const invitees = admin.MAIN_DATA.CONTACTS;

        // Validate required fields
        if (!eventTitle || !eventPrivacyPreference || !eventIMG || !eventStartTime) {
            console.log(eventTitle, eventIMG, eventPrivacyPreference, eventStartTime);
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
                EVENT_ATTENDEE_LIST: [admin.ID],  // Changed to array
                EVENT_START_TIME: eventStartTime,
                EVENT_LOCATION: eventLocation,
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

        // Fetch avatar URLs for admins
        const eventsWithAdminAvatar = await Promise.all(uniqueEvents.map(async event => {
            const adminId = event.PUBLIC_DATA.EVENT_ADMIN; // Assuming ADMIN is the correct field name

            // Fetch the user document to get the avatar URL
            const adminUser = await User.findOne({ ID: adminId });

            if (!adminUser) {
                throw new Error(`User with ID ${adminId} not found`);
            }

            // Update the event object with the admin avatar URL
            const updatedPublicData = {
                ...event.PUBLIC_DATA,
                ADMIN_AVATAR: adminUser.PERSONAL_INFO.AVATAR
            };

            // Remove EVENT_CHAT_LOG from the updated public data
            const { EVENT_CHAT_LOG, ...updatedPublicDataWithoutChatLog } = updatedPublicData;

            return {
                ...event.toObject(),
                PUBLIC_DATA: updatedPublicDataWithoutChatLog
            };
        }));


        return res.status(200).json({ events: eventsWithAdminAvatar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

exports.get_all_events_im_attending = asyncHandler(async (req, res, next) => {
    try {
        // Extract user ID from the request
        const userID = req.userId;
        // Fetch events where the user is an attendee
        const eventsAttending = await Event.find({ 'PUBLIC_DATA.EVENT_ATTENDEE_LIST': userID });

        // Return the list of events as a JSON response
        return res.status(200).json({ events: eventsAttending });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(`Error fetching events for user ${req.userId}:`, error);
        // Return a 500 Internal Server Error response
        return res.status(500).json({ error: 'Failed to retrieve events. Please try again later.' });
    }
});

// Get single Event 
exports.get_single_event = asyncHandler(async (req, res, next) => {
    try {
        const eventID = req.params.id;
        const userId = req.userId; // Assuming req.userId is available in your request

        // Validate the eventID if necessary (e.g., check if it's a valid MongoDB ObjectID)
        if (!eventID.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid Event ID' });
        }

        const eventOBJ = await Event.findById(eventID);
        if (!eventOBJ) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const arrayOfAttendeeIDs = eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST;

        // Fetch and modify attendee objects
        const modifiedAttendees = await Promise.all(arrayOfAttendeeIDs.map(async id => {
            const attendeeOBJ = await User.findOne({ ID: id });

            // Extract only necessary fields from PERSONAL_INFO excluding PASSWORD, EMAIL, SOCIAL_LINKS, BIO
            const {
                PASSWORD,
                EMAIL,
                SOCIAL_LINKS,
                BIO,
                ...personalInfoWithoutSensitiveData
            } = attendeeOBJ.PERSONAL_INFO;

            return {
                ID: attendeeOBJ.ID,  // Include attendee's ID
                PERSONAL_INFO: personalInfoWithoutSensitiveData
            };
        }));

        // Replace eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST with modifiedAttendees
        const modifiedEventOBJ = {
            ...eventOBJ,
            PUBLIC_DATA: {
                ...eventOBJ.PUBLIC_DATA,
                EVENT_ATTENDEE_LIST: modifiedAttendees
            }
        };

        // Omit EVENT_CHAT_LOG if req.userId is not in EVENT_ATTENDEE_LIST
        if (!arrayOfAttendeeIDs.includes(userId)) {
            delete modifiedEventOBJ.PUBLIC_DATA.EVENT_CHAT_LOG;
        }

        // Return the modified event object
        return res.status(200).json({ event: modifiedEventOBJ });

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
        const event = await Event.findOne({ _id: eventID });
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

        const userOBJ = await User.findOne({ ID: userID });
        const userContactsArray = userOBJ.MAIN_DATA.CONTACTS;

        if (event.PUBLIC_DATA.EVENT_PRIVACY_PREFERENCE === 'Friends of Friends' || event.PUBLIC_DATA.EVENT_PRIVACY_PREFERENCE === 'Public') {
            userContactsArray.forEach((contactID) => {
                if (!event.PUBLIC_DATA.EVENT_INVITEE_LIST.includes(contactID)) {
                    event.PUBLIC_DATA.EVENT_INVITEE_LIST.push(contactID);
                }
            });
        }

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

// MESSAGE EVENT
exports.post_message = asyncHandler(async (req, res, next) => {
    // Destructure values from req.body
    const { eventID, message } = req.body;
    const userID = req.userId;

    const userOBJ = await User.findOne({ ID : userID})
    const avatar = userOBJ.PERSONAL_INFO.AVATAR;
    const firstName = userOBJ.PERSONAL_INFO.FIRST_NAME;
    const lastName = userOBJ.PERSONAL_INFO.LAST_NAME;

    try {
        // Find the event by ID
        const eventOBJ = await Event.findOne({ _id: eventID }).exec();

        // If event not found, return 404
        if (!eventOBJ) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Push new message into the chat log
        eventOBJ.PUBLIC_DATA.EVENT_CHAT_LOG.push({
            ID: userID,
            AVATAR: avatar,
            FIRST_NAME: firstName,
            LAST_NAME: lastName,
            MESSAGE: message,
        });

        // Save the updated event object
        await eventOBJ.save();

        // Respond with success message
        res.status(200).json({ msg: 'Message posted successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});
