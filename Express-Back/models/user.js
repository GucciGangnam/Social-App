const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the main users schema with nested PERSONAL_INFO and META_DATA
const usersSchema = new Schema({
    DEMO_USER: { 
        type: Boolean,
        required: false,
    },
    ID: {
        type: String,
        required: true,
    },
    PERSONAL_INFO: {
        USER_NAME: {
            type: String,
            required: true,
        },
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
            default: [],
        },
        BIO: {
            type: String,
            default: "Hi, welcome to my profile",
        },
        AVATAR: {
            type: String,
            default: null,
        },
    },
    MAIN_DATA: {
        CIRCLES: {
            type: Array,
            default: [],
        },
        CONTACTS: {
            type: Array,
            default: [],
        },
        CONTACTS: {
            type: Array,
            default: [],
        },
        FRIEND_REQUESTS_IN: {
            type: Array,
            default: [],
        },
        FRIEND_REQUESTS_OUT: {
            type: Array,
            default: [],
        },
        HOSTING_EVENTS: {
            type: [String],
            default: [],
        },
        ATTENDING_EVENTS: {
            type: [String],
            default: [],
        },
        CHATS: {
            type: Array,
            default: [],
        },
    },
    META_DATA: {
        IP_ADDRESSES: {
            type: Array,
            default: [],
        },
        CURRENT_LOCATION: {
            type: String,
            default: null,
        },
        SIGNUP_DATE: {
            type: Date,
            default: Date.now,
        }
    }
}, { collection: 'Users' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('User', usersSchema, 'Users');