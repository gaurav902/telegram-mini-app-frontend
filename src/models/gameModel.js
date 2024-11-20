const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Telegram ID of the user
    spinsUsed: { type: Number, default: 0 },
    spinResults: [
        {
            result: { type: String, required: true }, // e.g., "500 points", "Try Again"
            pointsEarned: { type: Number, default: 0 },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Game', gameSchema);
