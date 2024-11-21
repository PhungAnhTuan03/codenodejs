const express = require('express');
const router = express.Router();
const { PostJob } = require('../models/postjob');
const { JobLocation } = require('../models/joblocation');
const { ApplicationUser } = require('../models/applicationsuser');
const { Experience } = require('../models/experience');
const { Major } = require('../models/major');
const ErrorResponse = require('../utils/errorResponse');
const validateRequest = require('../middleware/validateRequest');

// Routes
router.post('/', createJobSchema, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJobSchema, updateJob);
router.delete('/:id', deleteJob);

module.exports = router;

// Route Handlers

// Tạo bài tuyển dụng mới
function createJob(req, res, next) {
    PostJob.create({
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
        applicationUserId: req.user.id, // ID của nhà tuyển dụng
        majorId: req.body.majorId
    })
        .then((job) => res.status(201).json({ success: true, job }))
        .catch(next);
}

// Lấy tất cả bài tuyển dụng
function getAllJobs(req, res, next) {
    PostJob.findAll({
        where: { is_active: 1 },
        include: [
            { model: JobLocation, attributes: ['province_name'] },
            { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
            { model: Experience, attributes: ['experience_name'] },
            { model: Major, attributes: ['major_name'] }
        ]
    })
        .then((jobs) => res.status(200).json({ success: true, jobs }))
        .catch(next);
}

// Lấy thông tin chi tiết một bài tuyển dụng
function getJobById(req, res, next) {
    PostJob.findByPk(req.params.id, {
        include: [
            { model: JobLocation, attributes: ['province_name'] },
            { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
            { model: Experience, attributes: ['experience_name'] },
            { model: Major, attributes: ['major_name'] }
        ]
    })
        .then((job) => {
            if (!job) {
                return next(new ErrorResponse('Job not found', 404));
            }
            res.status(200).json({ success: true, job });
        })
        .catch(next);
}

// Cập nhật bài tuyển dụng
function updateJob(req, res, next) {
    PostJob.update(req.body, { where: { id: req.params.id } })
        .then((job) => res.status(200).json({ success: true, job }))
        .catch(next);
}

// Xóa bài tuyển dụng
function deleteJob(req, res, next) {
    PostJob.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ success: true, message: 'Job deleted' }))
        .catch(next);
}

// Validation Schemas
const Joi = require('joi');

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
        majorId: Joi.number().required()
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
        majorId: Joi.number().optional()
    });
    validateRequest(req, next, schema);
}
