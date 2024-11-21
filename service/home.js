const { PostJob } = require('../models');

module.exports = {
    getFeaturedJobs,
    getRecentJobs,
};

// Get featured jobs (limit 5)
async function getFeaturedJobs() {
    return await PostJob.findAll({
        where: { is_active: 1 },
        order: [['createdAt', 'DESC']],
        limit: 5,
    });
}

// Get recent jobs (limit 10)
async function getRecentJobs() {
    return await PostJob.findAll({
        where: { is_active: 1 },
        order: [['createdAt', 'DESC']],
        limit: 10,
    });
}
