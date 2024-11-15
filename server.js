const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const errorHandler = require('./middleware/errorHandler');
const applicationRoutes = require('./routes/applicationRoutes');
const authorizationRoutes = require('./routes/authorizationRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Logging middleware for development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routes
app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authorizationRoutes);

// Custom error handling middleware
app.use(errorHandler);

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found'
    });
});

// Cổng chạy server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
