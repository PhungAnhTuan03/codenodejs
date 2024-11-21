require('rootpath')(); // Allow root-relative imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Logging in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount API controllers
app.use('/api/users', require('./controllers/user'));
app.use('/api/jobs', require('./controllers/jobsposting'));
app.use('/api/applications', require('./controllers/applycation'));
app.use('/api/auth', require('./controllers/authorization'));
app.use('/api/home', require('./controllers/home'));

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
