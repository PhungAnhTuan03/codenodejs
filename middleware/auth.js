const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const ApplicationUser = require('../models/applicationsuser');

// Verify if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('You must be logged in to access this resource', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the token
        const user = await ApplicationUser.findByPk(decoded.id);
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        req.user = user; // Attach the user to the request object
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this resource', 401));
    }
};

// Verify if the user is an admin
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.poisition_user !== 'Admin') {
        return next(new ErrorResponse('Access denied. Admin privileges required.', 403));
    }
    next();
};

// Verify if the user is a company (recruiter)
exports.isRecruiter = (req, res, next) => {
    if (!req.user || req.user.poisition_user !== 'Company') {
        return next(new ErrorResponse('Access denied. Recruiter privileges required.', 403));
    }
    next();
};

// Verify if the user is an applicant
exports.isApplicant = (req, res, next) => {
    if (!req.user || req.user.poisition_user !== 'User') {
        return next(new ErrorResponse('Access denied. Applicant privileges required.', 403));
    }
    next();
};
