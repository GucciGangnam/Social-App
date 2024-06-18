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
    // valiudate and sanatize inputs 
    body("firstName")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('First name must be between 1 and 30 characters long')
        .matches(/^[A-Za-z\s]+$/, 'g')
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
        .matches(/^[A-Za-z\s]+$/, 'g')
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

    // Check if email id already assigned to another user.
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

    // // Salt and hash req.body.password
    async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
            next();
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: 'Server error' }] });
        }
    },

// Craete and save new user
    asyncHandler(async (req, res, next) => {
        // Create unique user ID
        const userID = "UID" + uuidv4();
        // Create new user
        const newUser = new User({
            ID: userID,
            PERSONAL_INFO: {
                FIRST_NAME: req.body.firstName,
                LAST_NAME: req.body.lastName,
                EMAIL: req.body.email,
                PASSWORD: req.body.password,
                SOCIAL_LINKS: [], // Assuming you have socialLinks in req.body
                BIO: "Hi, welcome to my profile"
            }
        });
        try {
            console.log(newUser);
            await newUser.save();
            return res.status(200).json({ msg: 'New user created' });
        } catch (error) {
            console.error("failed to create new user");
            return res.status(500).json({ errors: [{ msg: 'Failed to create new user' }] });
        }
    })
]


// READ
exports.read_user = (req, res, next) => {
    res.send("Reading A user");
    return;
}


// UPDATE
exports.put_user = (req, res, next) => {
    res.send("updating A user");
    return;
}


// DELETE
exports.delete_user = (req, res, next) => {
    res.send("Deleting A user");
    return;
}