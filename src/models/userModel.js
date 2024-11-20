const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    points: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    invitedBy: { type: String, default: null }, // Referral code of inviter
});

module.exports = mongoose.model('User', userSchema);
