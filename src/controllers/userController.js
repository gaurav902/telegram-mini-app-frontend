const User = require('../models/userModel'); // Assuming User model is in 'models/user.js'

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Find all users in the database
        res.status(200).json(users);  // Send the list of users as a response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);  // Find user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);  // Return the found user
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const { telegramId, username } = req.body;

    try {
        // Validate Telegram ID
        if (!telegramId) {
            return res.status(400).json({ message: 'Telegram ID is required' });
        }

        // Check if user already exists by telegramId
        const existingUser = await User.findOne({ telegramId });
        if (existingUser) {
            return res.status(200).json({ message: 'User already exists', user: existingUser });
        }

        // Create new user
        const newUser = new User({
            telegramId,
            username: username || 'Guest', // Default username to 'Guest'
            points: 0, // Default points
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        // Find the user by ID and update the data
        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User with ID ${userId} updated`, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User with ID ${userId} deleted` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get leaderboard (Top users by points)
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({}, { username: 1, points: 1, _id: 0 }) // Select username and points only
            .sort({ points: -1 }) // Sort by points descending
            .limit(50); // Top 50 users

        res.status(200).json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Error fetching leaderboard' });
    }
};

