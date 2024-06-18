const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the main users schema with nested PERSONAL_INFO and META_DATA
const usersSchema = new Schema({
    ID: {
        type: String,
        required: true,
    },
    PERSONAL_INFO: {
        FIRST_NAME: {
            type: String,
            required: true,
        },
        LAST_NAME: {
            type: String,
            required: true,
        },
        EMAIL: {
            type: String,
            required: true,
        },
        PASSWORD: {
            type: String,
            required: true,
        },
        SOCIAL_LINKS: {
            type: Array,
            required: false,
        },
        BIO: {
            type: String,
            required: true,
        },
    },
    MAIN_DATA: {
        CONTACTS: {
            type: Array,
            required: false,
        },
        HOSTING_EVENTS: {
            type: [String],
            required: false,
        },
        ATTENDING_EVENTS: {
            type: [String],
            required: false,
        },
        CIRCLES: {
            type: Array,
            required: false,
        },
        CHATS: {
            type: Array,
            required: false,
        },
    },
    META_DATA: {
        IP_ADDRESSES: {
            type: Array,
            required: false,
        },
        CURRENT_LOCATION: {
            type: String,
            required: false,
        },
        SIGNUP_DATE: {
            type: String,
            required: false,
        }
    }
}, { collection: 'Users' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('User', usersSchema, 'Users');
