// middleware/auth.js

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const ApplicationUser = require('../models/applicationsuser'); // Adjust path if necessary

// Middleware to verify if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    let token;

    // Check if token is in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token is provided, return an error
    if (!token) {
        return next(new ErrorResponse('You must be logged in to access this resource', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the decoded token and attach to req.user
        req.user = await ApplicationUser.findByPk(decoded.id);

        if (!req.user) {
            return next(new ErrorResponse('User not found', 404));
        }

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorResponse('Session expired, please log in again', 401));
        }
        return next(new ErrorResponse('Not authorized to access this resource', 401));
    }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        return next(new ErrorResponse('Access denied. Admin privileges required.', 403));
    }
    next();
};

// Middleware to check if the user is a recruiter
exports.isRecruiter = (req, res, next) => {
    if (!req.user || req.user.role !== 'Company') {
        return next(new ErrorResponse('Access denied. Recruiter privileges required.', 403));
    }
    next();
};

// Middleware to check if the user is an applicant
exports.isApplicant = (req, res, next) => {
    if (!req.user || req.user.role !== 'User') {
        return next(new ErrorResponse('Access denied. Applicant privileges required.', 403));
    }
    next();
};
