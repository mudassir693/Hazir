// Importing necessary modules
const dotenv = require('dotenv');
dotenv.config();


// looking for sync changes

const express = require('express');
const helmet = require('helmet'); // For security headers
const morgan = require('morgan'); // For logging requests
const cors = require('cors'); // For cross-origin requests handling

const DB_Connection = require('./config/dbConfig');
const app = express();

// Validate environment variables
if (!process.env.DB_URI) {
  console.error('ERROR: Missing DB_URI in environment variables');
  process.exit(1); // Exit the process if critical env variables are missing
}

DB_Connection(); // Establish DB connection

// Use middlewares
app.use(helmet()); // Adds security-related headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('tiny')); // Log HTTP requests in a concise format
app.use(express.json()); // For parsing JSON request bodies
app.use(express.urlencoded({ extended: false })); // For parsing URL-encoded request bodies

// Basic health check endpoint
app.get('/', (req, res) => {
  return res.status(200).json({
    data: 'Server running successfully',
    error: false,
    status: 200
  });
});

// API route handlers
app.use('/teamAuth', require('./routes/teamAuth'));
app.use('/team', require('./routes/team'));
app.use('/userAuth', require('./routes/userAuth'));
app.use('/user', require('./routes/user'));
app.use('/captainAuth', require('./routes/captainAuth'));
app.use('/captain', require('./routes/captain'));

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Internal Server Error'
  });
});

// Catch 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Route Not Found'
  });
});

// Define the port
const port = process.env.PORT || 5000; // Use the port from .env or default to 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
