const { PostJob, JobLocation, ApplicationUser, Experience, Major } = require('../models');
const ErrorResponse = require('../utils/errorResponse');

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
};

// Get all job postings
async function getAllJobs() {
    return await PostJob.findAll({
        where: { is_active: 1 },
        include: [
            { model: JobLocation, attributes: ['province_name'] },
            { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
            { model: Experience, attributes: ['experience_name'] },
            { model: Major, attributes: ['major_name'] },
        ],
    });
}

// Get job posting by ID
async function getJobById(jobId) {
    const job = await PostJob.findByPk(jobId, {
        include: [
            { model: JobLocation, attributes: ['province_name'] },
            { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
            { model: Experience, attributes: ['experience_name'] },
            { model: Major, attributes: ['major_name'] },
        ],
    });
    if (!job) {
        throw new ErrorResponse('Job not found', 404);
    }
    return job;
}

// Create a new job posting
async function createJob(params) {
    return await PostJob.create({
        ...params,
        create_at: new Date(),
        update_at: new Date(),
        is_active: params.is_active || 1,
    });
}

// Update an existing job posting
async function updateJob(jobId, params) {
    const job = await getJobById(jobId);
    Object.assign(job, params);
    job.update_at = new Date();
    await job.save();
}

// Delete a job posting
async function deleteJob(jobId) {
    const job = await getJobById(jobId);
    await job.destroy();
}
