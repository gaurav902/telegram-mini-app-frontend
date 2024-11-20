// controllers/gameController.js

exports.spinWheel = (req, res) => {
    // Logic to handle the spinning of the wheel
    const result = Math.random();  // Example logic for spinning a wheel (random result)
    res.status(200).json({ message: 'Spin result', result });
};

exports.getSpinHistory = (req, res) => {
    const userId = req.params.userId;
    // Fetch the user's spin history from the database (example)
    // You might need to replace this with an actual database call
    const history = [
        { spin: 1, result: 0.5 },
        { spin: 2, result: 0.8 },
    ];
    res.status(200).json({ message: `Spin history for user ${userId}`, history });
};
