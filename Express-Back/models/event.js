const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    PUBLIC_DATA: {
        EVENT_TITLE: {
            type: String,
            required: true,
        },
        EVENT_INFO: {
            type: String,
            required: false,
        },
        EVENT_PRIVACY_PREFERENCE: {
            type: String,
            required: true,
        },
        EVENT_IMG: {
            type: String,
            required: true,
        },
        EVENT_ADMIN: {
            type: String,
            required: true,
        },
        EVENT_INVITEE_LIST: {
            type: [String],
            required: true,
        },
        EVENT_ATTENDEE_LIST: {
            type: [String],
            required: true,
        },
        EVENT_START_TIME: {
            type: String,
            required: true,
        },
    },
    PRIVATE_DATA: {
        // Add fields here as needed
    }
}, { collection: 'Events' }); // Specify the collection name here

module.exports = mongoose.model('Event', eventsSchema, 'Events');