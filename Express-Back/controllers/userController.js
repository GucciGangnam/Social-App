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

// CREATE
exports.create_new_user = [
    // Validate and sanitize inputs 
    body("firstName")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('First name must be between 1 and 30 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('First name must only contain letters and spaces')
        .notEmpty()
        .withMessage('First name is required')
        .custom((value, { req }) => {
            req.body.firstName = value.charAt(0).toUpperCase() + value.slice(1);
            return true;
        }),

    body("lastName")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Last name must be between 1 and 30 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Last name must only contain letters and spaces')
        .notEmpty()
        .withMessage('Last name is required')
        .custom((value, { req }) => {
            req.body.lastName = value.charAt(0).toUpperCase() + value.slice(1);
            return true;
        }),

    body("email")
        .trim()
        .isEmail()
        .normalizeEmail({ all_lowercase: true }) // Optional: convert to lowercase
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),

    body("password")
        .isLength({ min: 8 })  // Minimum length of 8 characters
        .withMessage('Password must be at least 8 characters long')
        .notEmpty()
        .withMessage('Password is required'),

    // Function to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // Check if email is already assigned to another user.
    async (req, res, next) => {
        try {
            const user = await User.findOne({ 'PERSONAL_INFO.EMAIL': req.body.email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'Email is already in use' }] });
            }
            next();
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    },

    // Salt and hash the password
    async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
            next();
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    },

    // Create and save new user
    asyncHandler(async (req, res) => {
        // Create unique user ID
        const userID = "UID" + uuidv4();

        // Create new user
        const newUser = new User({
            ID: userID,
            PERSONAL_INFO: {
                FIRST_NAME: req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1),
                LAST_NAME: req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1),
                EMAIL: req.body.email,
                PASSWORD: req.body.password,
                SOCIAL_LINKS: [], // Assuming you have socialLinks in req.body
                BIO: "Hi, welcome to my profile",
                AVATAR: null
            },
            MAIN_DATA: {
                CIRCLES: [{
                    ALL_FRIENDS: [],
                    CLOSE_FRIENDS: []
                }]
            },
            META_DATA: {
                SIGNUP_DATE: new Date()
            }
        });

        try {
            await newUser.save();
            return res.status(201).json({ msg: 'New user created' });
        } catch (error) {
            console.error("Failed to create new user:", error);
            return res.status(500).json({ errors: [{ msg: 'Failed to create new user' }] });
        }
    })
];



// READ
// Get users personal Info
exports.get_own_profile_info = asyncHandler(async (req, res, next) => {
    try {
        const userOBJ = await User.findOne({ ID: req.userId });

        if (!userOBJ) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a shallow copy of userOBJ to manipulate the data
        const userData = { ...userOBJ.toObject() };

        // Remove PASSWORD field from PERSONAL_INFO
        if (userData.PERSONAL_INFO) {
            delete userData.PERSONAL_INFO.PASSWORD;
        }

        // Remove META_DATA field
        delete userData.META_DATA;

        // Remove ATTENDING_EVENTS, HOSTING_EVENTS, and CHATS from MAIN_DATA
        if (userData.MAIN_DATA) {
            delete userData.MAIN_DATA.ATTENDING_EVENTS;
            delete userData.MAIN_DATA.HOSTING_EVENTS;
            delete userData.MAIN_DATA.CHATS;
        }

        return res.status(200).json(userData);
    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        return next(error);
    }
});


// UPDATE

exports.update_user = [
    // Validate and sanitize inputs 
    body("firstName")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('First name must be between 1 and 30 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('First name must only contain letters and spaces')
        .notEmpty()
        .withMessage('First name is required')
        .custom((value, { req }) => {
            req.body.firstName = value.charAt(0).toUpperCase() + value.slice(1);
            return true;
        }),

    body("lastName")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Last name must be between 1 and 30 characters long')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Last name must only contain letters and spaces')
        .notEmpty()
        .withMessage('Last name is required')
        .custom((value, { req }) => {
            req.body.lastName = value.charAt(0).toUpperCase() + value.slice(1);
            return true;
        }),

    body("email")
        .trim()
        .isEmail()
        .normalizeEmail({ all_lowercase: true }) // Optional: convert to lowercase
        .withMessage('Invalid email format')
        .notEmpty()
        .withMessage('Email is required'),

    // Function to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },

    // Check if email is already assigned to another user.
    async (req, res, next) => {
        try {
            const user = await User.findOne({ 'PERSONAL_INFO.EMAIL': req.body.email });
            if (user && user.ID !== req.userId) {
                return res.status(400).json({ errors: [{ msg: 'Email is already in use' }] });
            }
            next();
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    },

    // Create and save new user
    asyncHandler(async (req, res) => {
        try {
            const userToUpdate = await User.findOne({ ID: req.userId })
            if (!userToUpdate) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Update user's FIRST_NAME in PERSONAL_INFO
            userToUpdate.PERSONAL_INFO.FIRST_NAME = req.body.firstName;
            // Update user's LAST_NAME in PERSONAL_INFO
            userToUpdate.PERSONAL_INFO.LAST_NAME = req.body.lastName;
            // Update user's BIO in PERSONAL_INFO
            userToUpdate.PERSONAL_INFO.BIO = req.body.bio;
            // Update user's EMAIL in PERSONAL_INFO
            userToUpdate.PERSONAL_INFO.EMAIL = req.body.email;
            // Update user's SOCIAL_LINKS in PERSONAL_INFO
            userToUpdate.PERSONAL_INFO.SOCIAL_LINKS = req.body.socialLinks;


            // Save the updated user document
            await userToUpdate.save();

            // Respond with success message
            return res.status(200).json({ msg: 'User updated successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    })

];


// DELETE
exports.delete_user = (req, res, next) => {
    res.send("Deleting A user");
    return;
}