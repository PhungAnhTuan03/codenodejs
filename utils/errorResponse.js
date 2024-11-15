class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Tạo stack trace để dễ dàng gỡ lỗi
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorResponse;
