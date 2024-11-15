// controllers/jobController.js

//const { PostJob, JobLocation, ApplicationUser, Experience, Major } = require('../models');
const PostJob = require('../models/postjob');
const JobLocation = require('../models/joblocation');
const ApplicationUser = require('../models/applicationsuser');
const Experience = require('../models/experience');
const Major = require('../models/major');

const ErrorResponse = require('../utils/errorResponse');

// Tạo bài tuyển dụng mới
exports.createJob = async (req, res, next) => {
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
            applicationUserId: req.user.id, // ID của nhà tuyển dụng
            majorId: req.body.majorId
        });
        res.status(201).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Lấy tất cả bài tuyển dụng
exports.getAllJobs = async (req, res, next) => {
    try {
        const jobs = await PostJob.findAll({
            where: { is_active: 1 },
            include: [
                { model: JobLocation, attributes: ['province_name'] },
                { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
                { model: Experience, attributes: ['experience_name'] },
                { model: Major, attributes: ['major_name'] }
            ]
        });
        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        next(error);
    }
};

// Lấy thông tin chi tiết một bài tuyển dụng
exports.getJobById = async (req, res, next) => {
    try {
        const job = await PostJob.findByPk(req.params.id, {
            include: [
                { model: JobLocation, attributes: ['province_name'] },
                { model: ApplicationUser, attributes: ['fullname', 'company_name'] },
                { model: Experience, attributes: ['experience_name'] },
                { model: Major, attributes: ['major_name'] }
            ]
        });
        if (!job) {
            return next(new ErrorResponse("Job not found", 404));
        }
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Cập nhật bài tuyển dụng
exports.updateJob = async (req, res, next) => {
    try {
        const job = await PostJob.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
};

// Xóa bài tuyển dụng
exports.deleteJob = async (req, res, next) => {
    try {
        await PostJob.destroy({ where: { id: req.params.id } });
        res.status(200).json({
            success: true,
            message: "Job deleted"
        });
    } catch (error) {
        next(error);
    }
};
