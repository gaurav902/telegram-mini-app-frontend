const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the routes with proper callbacks
router.get('/users', userController.getAllUsers);   // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.post('/create-user', userController.createUser);   // Create new user
router.put('/:id', userController.updateUser);  // Update user
router.delete('/:id', userController.deleteUser); // Delete user

// Add leaderboard route
router.get('/leaderboard', userController.getLeaderboard);  // Get leaderboard

module.exports = router;
