const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ApplicationUser } = require('../models/applicationsuser'); // Adjust path as needed
const ErrorResponse = require('../utils/errorResponse');
const validateRequest = require('../middleware/validateRequest');
const Joi = require('joi');

const router = express.Router();

// Helper Functions

// Generate JWT token
function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.poisition_user },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token valid for 1 hour
    );
}

// Send token in response
function sendTokenResponse(user, statusCode, res) {
    const token = generateToken(user);
    res.status(statusCode).json({
        success: true,
        token,
    });
}

// Routes
router.post('/register', registerSchema, register);
router.post('/login', loginSchema, login);
router.post('/logout', logout);
router.get('/profile', authorize(), getCurrentUser);

module.exports = router;

// Route Handlers

// Register a new user
async function register(req, res, next) {
    try {
        const { UserName, Email, PasswordHash, fullname, poisition_user } = req.body;

        // Check if the email is already in use
        const existingUser = await ApplicationUser.findOne({ where: { Email } });
        if (existingUser) {
            throw new ErrorResponse('Email already in use', 400);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(PasswordHash, 10);

        // Create a new user
        const user = await ApplicationUser.create({
            UserName,
            Email,
            PasswordHash: hashedPassword,
            fullname,
            poisition_user,
            EmailConfirmed: false,
            create_at: new Date(),
            is_active: 1,
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
}

// Log in an existing user
async function login(req, res, next) {
    try {
        const { Email, PasswordHash } = req.body;

        // Find user by email
        const user = await ApplicationUser.findOne({ where: { Email } });
        if (!user) {
            throw new ErrorResponse('Invalid login credentials', 401);
        }

        // Compare password
        const isMatch = await bcrypt.compare(PasswordHash, user.PasswordHash);
        if (!isMatch) {
            throw new ErrorResponse('Invalid login credentials', 401);
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
}

// Log out the user
function logout(req, res) {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
}

// Get current user profile
async function getCurrentUser(req, res, next) {
    try {
        const user = await ApplicationUser.findByPk(req.user.id, {
            attributes: ['id', 'UserName', 'Email', 'fullname', 'poisition_user'],
        });

        if (!user) {
            throw new ErrorResponse('User not found', 404);
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (err) {
        next(err);
    }
}

// Middleware to authorize access
function authorize() {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next(new ErrorResponse('Not authorized to access this resource', 401));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            next(new ErrorResponse('Invalid token', 401));
        }
    };
}

// Validation Schemas

// Register schema
function registerSchema(req, res, next) {
    const schema = Joi.object({
        UserName: Joi.string().required(),
        Email: Joi.string().email().required(),
        PasswordHash: Joi.string()
            .min(8)
            .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
            }),
        fullname: Joi.string().required(),
        poisition_user: Joi.string().valid('User', 'Admin', 'Company').required(),
    });
    validateRequest(req, next, schema);
}

// Login schema
function loginSchema(req, res, next) {
    const schema = Joi.object({
        Email: Joi.string().email().required(),
        PasswordHash: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}
