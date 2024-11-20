const Task = require('../models/taskModel');
const User = require('../models/userModel');
const TaskComplete = require('../models/taskCompleteModel'); // Model for task completion

// Get all tasks not done by the user
exports.getAllTasks = async (req, res) => {
    try {
        const { userId } = req.query;

        const completedTasks = await TaskComplete.find({ userId }).select('taskId');
        const completedTaskIds = completedTasks.map((ct) => ct.taskId);

        const tasks = await Task.find({
            isActive: true,
            _id: { $nin: completedTaskIds },
        }).select('title description points link'); // Include the link in the response

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};


// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, points, link } = req.body;

        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(409).json({ message: 'Task already exists' });
        }

        const task = new Task({ title, description, points, link });
        await task.save();

        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
};


// Complete a task
exports.completeTask = async (req, res) => {
    try {
        const { userId, taskId } = req.body;

        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Check if user exists
        const user = await User.findOne({ telegramId: userId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if task is already completed
        const taskCompletion = await TaskComplete.findOne({ userId, taskId });
        if (taskCompletion) {
            return res.status(409).json({ message: 'Task already completed' });
        }

        // Mark task as completed and add points to user
        const newCompletion = new TaskComplete({ userId, taskId });
        await newCompletion.save();

        user.points += task.points;
        await user.save();

        res.status(200).json({ message: 'Task completed successfully', user });
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ message: 'Error completing task' });
    }
};
