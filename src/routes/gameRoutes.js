// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const { spinWheel, getSpinHistory } = require('../controllers/gameController'); // Correct path

// Route to spin the wheel
router.post('/games', spinWheel);  // This should match the spinWheel function in gameController.js

// Route to get spin history for a user
router.get('/:userId/history', getSpinHistory);  // This should match the getSpinHistory function

module.exports = router;
