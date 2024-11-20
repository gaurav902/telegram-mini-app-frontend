// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const referralRoutes = require('./referralRoutes');
const gameRoutes = require('./gameRoutes');
const homeRoutes = require('./homeRoutes');

const router = express.Router();

// Define the routes
router.use('/users', userRoutes);  // Should work as /users/profile
router.use('/tasks', taskRoutes);
router.use('/referrals', referralRoutes);
router.use('/games', gameRoutes);
router.use('/', homeRoutes);  // Home route at the root

// Export the router
module.exports = router;
