// controllers/applicationController.js

//const { ApplyJob, PostJob, ApplicationUser } = require('../models');
const ApplyJob = require('../models/applyjob');
const PostJob = require('../models/postjob');
const ApplicationUser = require('../models/applicationsuser');
const ErrorResponse = require('../utils/errorResponse');

// Nộp đơn ứng tuyển
exports.submitApplication = async (req, res, next) => {
    try {
        const application = await ApplyJob.create({
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
        });
        res.status(201).json({
            success: true,
            application
        });
    } catch (error) {
        next(error);
    }
};

// Lấy tất cả đơn ứng tuyển cho một bài tuyển dụng
exports.getApplicationsByJob = async (req, res, next) => {
    try {
        const applications = await ApplyJob.findAll({
            where: { post_JobId: req.params.jobId },
            include: [{ model: ApplicationUser, attributes: ['fullname', 'Email'] }]
        });
        res.status(200).json({
            success: true,
            applications
        });
    } catch (error) {
        next(error);
    }
};

// Lấy tất cả đơn ứng tuyển của người dùng hiện tại
exports.getMyApplications = async (req, res, next) => {
    try {
        const applications = await ApplyJob.findAll({
            where: { application_userId: req.user.id }
        });
        res.status(200).json({
            success: true,
            applications
        });
    } catch (error) {
        next(error);
    }
};
