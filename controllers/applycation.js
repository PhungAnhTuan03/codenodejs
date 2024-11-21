const express = require('express');
const router = express.Router();
const { ApplyJob, PostJob, ApplicationUser } = require('../models');
const { submitApplicationSchema } = require('../validations/applicationValidation');
const validateRequest = require('../middleware/validateRequest');
const ErrorResponse = require('../utils/errorResponse');

// Routes
router.post('/:jobId', validateRequest(submitApplicationSchema), submitApplication);
router.get('/job/:jobId', getApplicationsByJob);
router.get('/my-applications', getMyApplications);

module.exports = router;

// Route Handlers

// Nộp đơn ứng tuyển
function submitApplication(req, res, next) {
    ApplyJob.create({
        url_cv: req.body.url_cv,
        cover_letter: req.body.cover_letter,
        Feedback: req.body.Feedback,
        Email: req.body.Email,
        FullName: req.body.FullName,
        imageCompany: req.body.imageCompany,
        companyName: req.body.companyName,
        emailCompany: req.body.emailCompany,
        contact_noCompany: req.body.contact_noCompany,
        create_at: new Date(),
        update_at: new Date(),
        post_JobId: req.params.jobId,
        application_userId: req.user.id // ID của ứng viên
    })
        .then((application) => res.status(201).json({ success: true, application }))
        .catch(next);
}

// Lấy tất cả đơn ứng tuyển cho một bài tuyển dụng
function getApplicationsByJob(req, res, next) {
    ApplyJob.findAll({
        where: { post_JobId: req.params.jobId },
        include: [{ model: ApplicationUser, attributes: ['fullname', 'Email'] }]
    })
        .then((applications) =>
            res.status(200).json({
                success: true,
                applications
            })
        )
        .catch(next);
}

// Lấy tất cả đơn ứng tuyển của người dùng hiện tại
function getMyApplications(req, res, next) {
    ApplyJob.findAll({
        where: { application_userId: req.user.id }
    })
        .then((applications) =>
            res.status(200).json({
                success: true,
                applications
            })
        )
        .catch(next);
}

// Validation Schemas
const Joi = require('joi');

function submitApplicationSchema(req, res, next) {
    const schema = Joi.object({
        url_cv: Joi.string().uri().required(),
        cover_letter: Joi.string().optional(),
        Feedback: Joi.string().optional(),
        Email: Joi.string().email().required(),
        FullName: Joi.string().required(),
        imageCompany: Joi.string().optional(),
        companyName: Joi.string().optional(),
        emailCompany: Joi.string().email().optional(),
        contact_noCompany: Joi.string().optional()
    });
    validateRequest(req, next, schema);
}
