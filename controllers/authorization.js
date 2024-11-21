const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApplicationUser = require('../models/applicationsuser'); // Adjust path if necessary
const ErrorResponse = require('../utils/errorResponse');

// Helper functions
function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.poisition_user }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Customize token expiration time
    });
}

function sendTokenResponse(user, statusCode, res) {
    const token = generateToken(user);
    res.status(statusCode).json({
        success: true,
        token,
    });
}

// Routes
const router = express.Router();

router.post('/register', registerSchema, register);
router.post('/login', loginSchema, login);
router.post('/logout', logout);

module.exports = router;

// Route Handlers

// Register a new user
function register(req, res, next) {
    const { UserName, Email, PasswordHash, fullname, poisition_user } = req.body;

    // Check if the email is already in use
    ApplicationUser.findOne({ where: { Email } })
        .then((existingUser) => {
            if (existingUser) {
                throw new ErrorResponse('Email already in use', 400);
            }

            // Hash the password
            return bcrypt.hash(PasswordHash, 10);
        })
        .then((hashedPassword) =>
            ApplicationUser.create({
                UserName,
                Email,
                PasswordHash: hashedPassword,
                fullname,
                poisition_user,
                EmailConfirmed: false,
                create_at: new Date(),
                is_active: 1,
            })
        )
        .then((user) => sendTokenResponse(user, 201, res))
        .catch(next);
}

// Log in an existing user
function login(req, res, next) {
    const { Email, PasswordHash } = req.body;

    ApplicationUser.findOne({ where: { Email } })
        .then((user) => {
            if (!user) {
                throw new ErrorResponse('Invalid login credentials', 401);
            }

            // Verify password
            return bcrypt.compare(PasswordHash, user.PasswordHash).then((isMatch) => {
                if (!isMatch) {
                    throw new ErrorResponse('Invalid login credentials', 401);
                }

                sendTokenResponse(user, 200, res);
            });
        })
        .catch(next);
}

// Log out the user
function logout(req, res) {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
}

// Validation Schemas
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

function registerSchema(req, res, next) {
    const schema = Joi.object({
        UserName: Joi.string().required(),
        Email: Joi.string().email().required(),
        PasswordHash: Joi.string().min(6).required(),
        fullname: Joi.string().required(),
        poisition_user: Joi.string().valid('User', 'Admin', 'Company').required(),
    });
    validateRequest(req, next, schema);
}

function loginSchema(req, res, next) {
    const schema = Joi.object({
        Email: Joi.string().email().required(),
        PasswordHash: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}
