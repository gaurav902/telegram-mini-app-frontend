const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('../src/routes/index.js');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler);

module.exports = app;
