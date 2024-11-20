const express = require('express');
const router = express.Router();
const {
    createReferral,
    getReferralsByUser,
    rewardReferralPoints,
} = require('../controllers/referralController');

// Route to create a referral
router.post('/referrals', createReferral);

// Route to get all referrals made by a user
router.get('/:userId', getReferralsByUser);

// Route to reward points for a successful referral
router.post('/:referralId/reward', rewardReferralPoints);

module.exports = router;
