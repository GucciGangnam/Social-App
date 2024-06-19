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

// CONTROLLERS 

// Login User
exports.login_user = asyncHandler(async(req, res, next) => { 
// Does user exist?
const existingUser = await User.findOne({ 'PERSONAL_INFO.EMAIL': req.body.email })
if (!existingUser) {
    // Email not found
    return res.status(400).json({ msg: "Email password combination don't match" });
}
// Compare passwords
const passwordMatch = await bcrypt.compare(req.body.password, existingUser.PERSONAL_INFO.PASSWORD);
if (!passwordMatch) {
    return res.status(400).json({ msg: "Email password combination don't match" });
}
// Create a payload 
const payload = {
    userId: existingUser.ID
}
// Send access token 
const secretKey = process.env.API_SECURITY_KEY;
const accessToken = jwt.sign(payload, secretKey, { expiresIn: '60m' })
res.status(200).json({ accessToken: accessToken })
return;
})

// Authenticate accesstoken 
exports.validate_accessToken = asyncHandler(async (req, res, next) => {
    // Get authorization header
    const clientAccessToken = req.headers.authorization
    // if it fails 
    if (!clientAccessToken || !clientAccessToken.startsWith('Bearer ')) {
        // If the authorization token is missing or doesnt start with "bearer", return a 401 Unauthorized response
        return res.status(401).json({ msg: 'Token missing opr not formatted correctly' });
    }
    // Extract the token part from the Authorization header
    const token = clientAccessToken.split(' ')[1];
    try {
        // Verify the token
        const secretKey = process.env.API_SECURITY_KEY;
        const payload = jwt.verify(token, secretKey);
        const userId = payload.userId;
        // Pass user ID to the next middleware or route handler
        req.userId = userId;
        // Proceed to the next middleware
        console.log('Authentification passed')
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 401 Unauthorized response
        console.error(error)
        return res.status(401).json({ msg: 'Unauthorized Access Token' });
    }
})