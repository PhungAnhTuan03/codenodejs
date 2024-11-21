const express = require('express');
const router = express.Router();
const { PostJob } = require('../models/postjob');
const { JobLocation } = require('../models/joblocation');
const { ApplicationUser } = require('../models/applicationsuser');
const { Experience } = require('../models/experience');
const { Major } = require('../models/major');
const validateRequest = require('../middleware/validateRequest');
const ErrorResponse = require('../utils/errorResponse');
const Joi = require('joi');

// Routes
router.post('/', createJobSchema, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJobSchema, updateJob);
router.delete('/:id', deleteJob);

module.exports = router;

// Route Handlers

// Create a new job posting
async function createJob(req, res, next) {
    try {
        const job = await PostJob.create({
            job_name: req.body.job_name,
            job_description: req.body.job_description,
            required_skill: req.body.required_skill,
            benefit: req.body.benefit,
            employmentType: req.body.employmentType,
            salary_min: req.body.salary_min,
            salary_max: req.body.salary_max,
            detail_location: req.body.detail_location,
            create_at: new Date(),
            update_at: new Date(),
            apply_date: req.body.apply_date,
            is_active: req.body.is_active || 1,
            job_LocationId: req.body.job_LocationId,
            experienceId: req.body.experienceId,
            applicationUserId: req.user.id, // Recruiter ID
            majorId: req.body.majorId,
        });
        res.status(201).json({ success: true, job });
    } catch (err) {
        next(err);
    }
}

// Get all job postings
async function getAllJobs(req, res, next) {
    try {
        const jobs = await PostJob.findAll({
            where: { is_active: 1 },
            include: [
                { model: JobLocation, attributes: ['province_name'] },
                { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
                { model: Experience, attributes: ['experience_name'] },
                { model: Major, attributes: ['major_name'] },
            ],
        });
        res.status(200).json({ success: true, jobs });
    } catch (err) {
        next(err);
    }
}

// Get a specific job posting by ID
async function getJobById(req, res, next) {
    try {
        const job = await PostJob.findByPk(req.params.id, {
            include: [
                { model: JobLocation, attributes: ['province_name'] },
                { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
                { model: Experience, attributes: ['experience_name'] },
                { model: Major, attributes: ['major_name'] },
            ],
        });

        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({ success: true, job });
    } catch (err) {
        next(err);
    }
}

// Update a job posting
async function updateJob(req, res, next) {
    try {
        const job = await PostJob.findByPk(req.params.id);

        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }

        await job.update(req.body);
        res.status(200).json({ success: true, message: 'Job updated successfully', job });
    } catch (err) {
        next(err);
    }
}

// Delete a job posting
async function deleteJob(req, res, next) {
    try {
        const job = await PostJob.findByPk(req.params.id);

        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }

        await job.destroy();
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (err) {
        next(err);
    }
}

// Validation Schemas

function createJobSchema(req, res, next) {
    const schema = Joi.object({
        job_name: Joi.string().required(),
        job_description: Joi.string().required(),
        required_skill: Joi.string().required(),
        benefit: Joi.string().required(),
        employmentType: Joi.string().required(),
        salary_min: Joi.number().required(),
        salary_max: Joi.number().required(),
        detail_location: Joi.string().required(),
        apply_date: Joi.date().required(),
        is_active: Joi.number().valid(0, 1).default(1),
        job_LocationId: Joi.number().required(),
        experienceId: Joi.number().required(),
        majorId: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function updateJobSchema(req, res, next) {
    const schema = Joi.object({
        job_name: Joi.string().optional(),
        job_description: Joi.string().optional(),
        required_skill: Joi.string().optional(),
        benefit: Joi.string().optional(),
        employmentType: Joi.string().optional(),
        salary_min: Joi.number().optional(),
        salary_max: Joi.number().optional(),
        detail_location: Joi.string().optional(),
        apply_date: Joi.date().optional(),
        is_active: Joi.number().valid(0, 1).optional(),
        job_LocationId: Joi.number().optional(),
        experienceId: Joi.number().optional(),
        majorId: Joi.number().optional(),
    });
    validateRequest(req, next, schema);
}
