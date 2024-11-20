const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
    referrerId: { type: String, required: true }, // Telegram ID of the referrer
    refereeId: { type: String, required: true },  // Telegram ID of the new user referred
    pointsEarned: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Referral', referralSchema);
