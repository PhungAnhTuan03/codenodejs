// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authorization');
const auth = require('../middleware/auth');

// Public route for user registration
router.post('/register', authController.register);

// Public route for user login
router.post('/login', authController.login);

// Protected route for logging out (requires authentication)
router.post('/logout', auth.isAuthenticated, authController.logout);

// Protected route to get the current user's profile
router.get('/profile', auth.isAuthenticated, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
        message: 'User profile retrieved successfully',
    });
});

// Admin-only route
router.get('/admin', auth.isAuthenticated, auth.isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome, Admin!',
    });
});

// Recruiter-only route
router.get('/recruiter', auth.isAuthenticated, auth.isRecruiter, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome, Recruiter!',
    });
});

// Applicant-only route
router.get('/applicant', auth.isAuthenticated, auth.isApplicant, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome, Applicant!',
    });
});

module.exports = router;
