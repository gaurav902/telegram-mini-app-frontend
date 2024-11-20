const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Fetch all tasks
router.get('/all', taskController.getAllTasks);

// Create a task
router.post('/create', taskController.createTask);

// Complete a task
router.post('/complete', taskController.completeTask);

module.exports = router;
