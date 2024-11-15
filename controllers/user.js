// controllers/userController.js

const { ApplicationUser } = require('../models/applicationsuser');
const ErrorResponse = require('../utils/errorResponse');

// Lấy thông tin người dùng hiện tại
exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await ApplicationUser.findByPk(req.user.id, {
            attributes: { exclude: ['PasswordHash'] }
        });
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res, next) => {
    try {
        const user = await ApplicationUser.update(req.body, { where: { id: req.user.id } });
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};
