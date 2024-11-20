const dotenv = require('dotenv');
dotenv.config({ path: './src/.env' }); // Ensure .env file path is set correctly

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); // Import the DB connection module
const routes = require('./routes'); // Import the central route file

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // For parsing JSON requests

// Ensure DB connection is established
connectDB();

// Use the centralized routes
app.use(routes); // Using the combined routes from routes/index.js

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, Telegram Mini App Backend!');
});

// Set the port for the app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
