const bcrypt = require('bcryptjs');
const { ApplicationUser } = require('../models/applicationsuser'); // Adjust the path as needed
const ErrorResponse = require('../utils/errorResponse');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

// Get all users
async function getAll() {
    return await ApplicationUser.findAll({
        attributes: [
            'id',
            'UserName',
            'fullname',
            'Email',
            'phoneNumber',
            'city',
            'address',
            'date_of_birth',
            'hard_skills',
            'soft_skills',
            'introduce_yourself',
            'position_user',
            'role',
            'create_at',
            'update_at',
            'is_active',
        ],
    });
}

// Get a user by ID
async function getById(id) {
    const user = await getUser(id);
    return user;
}

// Create a new user
async function create(params) {
    // Validate: Check if the email already exists
    if (await ApplicationUser.findOne({ where: { Email: params.Email } })) {
        throw new ErrorResponse(`Email "${params.Email}" is already registered`, 400);
    }

    // Hash the password
    if (params.PasswordHash) {
        params.PasswordHash = await bcrypt.hash(params.PasswordHash, 10);
    }

    // Create and save the new user
    const user = new ApplicationUser(params);
    await user.save();
}

// Update an existing user
async function update(id, params) {
    const user = await getUser(id);

    // Validate: Check if the email is being updated to an existing email
    if (
        params.Email &&
        params.Email !== user.Email &&
        (await ApplicationUser.findOne({ where: { Email: params.Email } }))
    ) {
        throw new ErrorResponse(`Email "${params.Email}" is already taken`, 400);
    }

    // Hash the password if it is provided
    if (params.PasswordHash) {
        params.PasswordHash = await bcrypt.hash(params.PasswordHash, 10);
    }

    // Update user details
    Object.assign(user, params);
    user.update_at = new Date();
    await user.save();
}

// Delete a user
async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// Helper function to get a user by ID
async function getUser(id) {
    const user = await ApplicationUser.findByPk(id, {
        attributes: [
            'id',
            'UserName',
            'fullname',
            'Email',
            'phoneNumber',
            'city',
            'address',
            'date_of_birth',
            'hard_skills',
            'soft_skills',
            'introduce_yourself',
            'position_user',
            'role',
            'create_at',
            'update_at',
            'is_active',
        ],
    });
    if (!user) {
        throw new ErrorResponse('User not found', 404);
    }
    return user;
}
