// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApplicationUser = require('../models/applicationsuser'); // Adjust path if necessary
const ErrorResponse = require('../utils/errorResponse');

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Helper function to send token as a response
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user);

    res.status(statusCode).json({
        success: true,
        token,
    });
};

// Register a new user
exports.register = async (req, res, next) => {
    try {
        const { fullname, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await ApplicationUser.findOne({ where: { email } });
        if (existingUser) {
            return next(new ErrorResponse('Email already in use', 400));
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await ApplicationUser.create({
            fullname,
            email,
            password: hashedPassword,
            role,
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// Log in an existing user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate user existence
        const user = await ApplicationUser.findOne({ where: { email } });
        if (!user) {
            return next(new ErrorResponse('Invalid login credentials', 401));
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid login credentials', 401));
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// Log out the user (if storing token in cookies)
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};
