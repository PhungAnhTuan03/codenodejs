const { ApplyJob, PostJob, ApplicationUser } = require('../models');
const ErrorResponse = require('../utils/errorResponse');

module.exports = {
    submitApplication,
    getApplicationsByJob,
    getApplicationsByUser,
};

// Submit a job application
async function submitApplication(params, jobId, userId) {
    const job = await PostJob.findByPk(jobId);
    if (!job) {
        throw new ErrorResponse('Job not found', 404);
    }

    return await ApplyJob.create({
        ...params,
        post_JobId: jobId,
        application_userId: userId,
        create_at: new Date(),
        update_at: new Date(),
    });
}

// Get all applications for a specific job
async function getApplicationsByJob(jobId) {
    return await ApplyJob.findAll({
        where: { post_JobId: jobId },
        include: [{ model: ApplicationUser, attributes: ['fullname', 'Email'] }],
    });
}

// Get all applications by a specific user
async function getApplicationsByUser(userId) {
    return await ApplyJob.findAll({
        where: { application_userId: userId },
    });
}
