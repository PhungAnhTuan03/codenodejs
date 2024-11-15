// middleware/errorHandler.js
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Đặt mã trạng thái mặc định là 500 nếu không được xác định
    error.statusCode = error.statusCode || 500;

    // Trả về lỗi dạng JSON
    res.status(error.statusCode).json({
        success: false,
        message: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
