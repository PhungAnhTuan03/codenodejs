const express = require('express');
const router = express.Router();
//const { ApplyJob, PostJob, ApplicationUser } = require('../models'); // Import models
const { ApplyJob } = require('../models/applyjob');
const { PostJob } = require('../models/postjob');
const { ApplicationUser } = require('../models/applicationsuser');
const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const ErrorResponse = require('../utils/errorResponse');

// Routes
router.post('/:jobId', validateRequest(submitApplicationSchema), submitApplication);
router.get('/job/:jobId', getApplicationsByJob);
router.get('/my-applications', getMyApplications);

module.exports = router;

// Route Handlers

// Submit a job application
async function submitApplication(req, res, next) {
    try {
        const { url_cv, cover_letter, Feedback, Email, FullName, imageCompany, companyName, emailCompany, contact_noCompany } = req.body;

        // Ensure the job exists
        const job = await PostJob.findByPk(req.params.jobId);
        if (!job) {
            throw new ErrorResponse('Job not found', 404);
        }

        // Create the application
        const application = await ApplyJob.create({
            url_cv,
            cover_letter,
            Feedback,
            Email,
            FullName,
            imageCompany,
            companyName,
            emailCompany,
            contact_noCompany,
            create_at: new Date(),
            update_at: new Date(),
            post_JobId: req.params.jobId,
            application_userId: req.user.id, // ID of the applicant
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application,
        });
    } catch (err) {
        next(err);
    }
}

// Get all applications for a specific job
async function getApplicationsByJob(req, res, next) {
    try {
        const applications = await ApplyJob.findAll({
            where: { post_JobId: req.params.jobId },
            include: [{ model: ApplicationUser, attributes: ['fullname', 'Email'] }],
        });

        res.status(200).json({
            success: true,
            applications,
        });
    } catch (err) {
        next(err);
    }
}

// Get all applications submitted by the current user
async function getMyApplications(req, res, next) {
    try {
        const applications = await ApplyJob.findAll({
            where: { application_userId: req.user.id },
        });

        res.status(200).json({
            success: true,
            applications,
        });
    } catch (err) {
        next(err);
    }
}

// Validation Schemas

// Validation schema for submitting an application
function submitApplicationSchema(req, res, next) {
    const schema = Joi.object({
        url_cv: Joi.string().uri().required().messages({
            'string.uri': 'CV URL must be a valid URI',
            'any.required': 'CV URL is required',
        }),
        cover_letter: Joi.string().optional(),
        Feedback: Joi.string().optional(),
        Email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),
        FullName: Joi.string().required().messages({
            'any.required': 'Full Name is required',
        }),
        imageCompany: Joi.string().optional(),
        companyName: Joi.string().optional(),
        emailCompany: Joi.string().email().optional(),
        contact_noCompany: Joi.string().optional(),
    });
    validateRequest(req, next, schema);
}
