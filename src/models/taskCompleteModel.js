// models/taskCompleteModel.js
const mongoose = require('mongoose');

const taskCompleteSchema = new mongoose.Schema({
    userId: { type: Number, required: true }, // Assuming telegramId as Number
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TaskComplete', taskCompleteSchema);
