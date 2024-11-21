// const express = require('express');
// const router = express.Router();
// const applicationController = require('../controllers/applycation');
// const auth = require('../middleware/auth');

// // Route to submit a job application (only accessible to authenticated applicants)
// router.post('/apply/:jobId', auth.isAuthenticated, auth.isApplicant, applicationController.submitApplication);

// // Route to get all applications for a specific job (accessible to authenticated recruiters)
// router.get('/applications/job/:jobId', auth.isAuthenticated, auth.isRecruiter, applicationController.getApplicationsByJob);

// // Route to get all applications submitted by the current user (accessible to authenticated applicants)
// router.get('/applications/mine', auth.isAuthenticated, auth.isApplicant, applicationController.getMyApplications);

// module.exports = router;
