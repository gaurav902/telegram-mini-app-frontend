// homeController.js
const User = require('../models/userModel');

const getHomeData = async (req, res) => {
    try {
        const telegramId = req.query.telegramId; // Telegram ID from query
        
        let user = await User.findOne({ telegramId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const leaderboard = await User.find()
            .sort({ points: -1 })
            .limit(10)
            .select('username points');

        res.json({
            user: {
                username: user.username,
                points: user.points,
            },
            leaderboard,
        });
    } catch (error) {
        console.error('Error fetching home data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getHomeData };
