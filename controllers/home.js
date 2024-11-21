const express = require('express');
const router = express.Router();
const { PostJob } = require('../models/postjob');

// Routes
router.get('/', homePage);

module.exports = router;

// Route Handlers

// Lấy các bài tuyển dụng nổi bật và gần đây
function homePage(req, res, next) {
    Promise.all([
        // Featured jobs: Lấy 5 bài tuyển dụng nổi bật
        PostJob.findAll({
            where: { is_active: 1 },
            order: [['createdAt', 'DESC']],
            limit: 5
        }),
        // Recent jobs: Lấy 10 bài tuyển dụng gần đây
        PostJob.findAll({
            where: { is_active: 1 },
            order: [['createdAt', 'DESC']],
            limit: 10
        })
    ])
        .then(([featuredJobs, recentJobs]) =>
            res.status(200).json({
                success: true,
                featuredJobs,
                recentJobs
            })
        )
        .catch(next); // Bắt lỗi và chuyển đến middleware xử lý lỗi
}
