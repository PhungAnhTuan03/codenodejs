const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApplicationUser } = require('../models/applicationsuser');
const ErrorResponse = require('../utils/errorResponse');

module.exports = {
    register,
    login,
    getCurrentUser,
};

// Register a new user
async function register(params) {
    const { Email, PasswordHash } = params;

    // Check if the email already exists
    if (await ApplicationUser.findOne({ where: { Email } })) {
        throw new ErrorResponse(`Email "${Email}" is already registered`, 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(PasswordHash, 10);

    return await ApplicationUser.create({
        ...params,
        PasswordHash: hashedPassword,
        EmailConfirmed: false,
        create_at: new Date(),
        is_active: 1,
    });
}

// Log in an existing user
async function login(params) {
    const { Email, PasswordHash } = params;

    // Check if the user exists
    const user = await ApplicationUser.findOne({ where: { Email } });
    if (!user) {
        throw new ErrorResponse('Invalid login credentials', 401);
    }

    // Validate password
    const isMatch = await bcrypt.compare(PasswordHash, user.PasswordHash);
    if (!isMatch) {
        throw new ErrorResponse('Invalid login credentials', 401);
    }

    // Generate token
    const token = jwt.sign({ id: user.id, role: user.poisition_user }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token, user };
}

// Get the current user's profile
async function getCurrentUser(userId) {
    const user = await ApplicationUser.findByPk(userId, {
        attributes: ['id', 'UserName', 'fullname', 'Email', 'position_user', 'role'],
    });
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }
    return user;
}
