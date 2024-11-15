const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

// Route to get the current user's information (only accessible to authenticated users)
router.get('/user', auth.isAuthenticated, userController.getCurrentUser);

// Route to update the current user's information (only accessible to authenticated users)
router.put('/user', auth.isAuthenticated, userController.updateUser);

module.exports = router;
