const ErrorResponse = require('../utils/errorResponse');

// Trong một controller
exports.getJobById = async (req, res, next) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }
        res.status(200).json({ success: true, job });
    } catch (error) {
        next(error);
    }
};
