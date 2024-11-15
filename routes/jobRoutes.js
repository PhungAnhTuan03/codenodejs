const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobsposting');
const auth = require('../middleware/auth');

// Route to create a new job (only accessible to authenticated users, typically recruiters)
router.post('/jobs', auth.isAuthenticated, auth.isRecruiter, jobController.createJob);

// Route to get all jobs (publicly accessible)
router.get('/jobs', jobController.getAllJobs);

// Route to get a job by ID (publicly accessible)
router.get('/jobs/:id', jobController.getJobById);

// Route to update a job by ID (only accessible to authenticated recruiters)
router.put('/jobs/:id', auth.isAuthenticated, auth.isRecruiter, jobController.updateJob);

// Route to delete a job by ID (only accessible to authenticated recruiters)
router.delete('/jobs/:id', auth.isAuthenticated, auth.isRecruiter, jobController.deleteJob);

module.exports = router;
