const express = require('express');
const router = express.Router();
const { PostJob } = require('../models/postjob');

// Routes
router.get('/', homePage);

module.exports = router;

// Route Handlers

// Fetch featured and recent job postings
async function homePage(req, res, next) {
    try {
        // Fetch featured jobs (limit: 5)
        const featuredJobs = await PostJob.findAll({
            where: { is_active: 1 },
            order: [['createdAt', 'DESC']],
            limit: 5,
        });

        // Fetch recent jobs (limit: 10)
        const recentJobs = await PostJob.findAll({
            where: { is_active: 1 },
            order: [['createdAt', 'DESC']],
            limit: 10,
        });

        // Respond with results
        res.status(200).json({
            success: true,
            featuredJobs,
            recentJobs,
        });
    } catch (err) {
        next(err); // Pass errors to the error-handling middleware
    }
}
