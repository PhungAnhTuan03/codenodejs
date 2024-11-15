// controllers/homeController.js

const { PostJob } = require('../models/postjob');

// Lấy các bài tuyển dụng nổi bật và gần đây
exports.homePage = async (req, res, next) => {
    try {
        const featuredJobs = await PostJob.findAll({
            where: { is_active: 1 },
            order: [['createdAt', 'DESC']],
            limit: 5
        });

        const recentJobs = await PostJob.findAll({
            where: { is_active: 1 },
            order: [['createdAt', 'DESC']],
            limit: 10
        });

        res.status(200).json({
            success: true,
            featuredJobs,
            recentJobs
        });
    } catch (error) {
        next(error);
    }
};
