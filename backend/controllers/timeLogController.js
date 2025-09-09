const TimeLog = require('../models/TimeLog');
const Task = require('../models/Task');

exports.startTimer = async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findOne({ _id: taskId, userId: req.userId });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const timeLog = new TimeLog({ taskId, userId: req.userId, startTime: new Date() });
        await timeLog.save();
        res.status(201).json(timeLog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.stopTimer = async (req, res) => {
    try {
        const { id } = req.params;
        const timeLog = await TimeLog.findOne({ _id: id, userId: req.userId });
        if (!timeLog) return res.status(404).json({ error: 'Time log not found' });

        timeLog.endTime = new Date();
        timeLog.duration = Math.round((timeLog.endTime - timeLog.startTime) / 1000);
        await timeLog.save();
        res.json(timeLog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTimeLogs = async (req, res) => {
    try {
        const { taskId } = req.query;
        const query = { userId: req.userId };
        if (taskId) query.taskId = taskId;
        
        const timeLogs = await TimeLog.find(query).populate('taskId');
        res.json(timeLogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDailySummary = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const timeLogs = await TimeLog.find({
            userId: req.userId,
            startTime: { $gte: startOfDay, $lte: endOfDay },
        }).populate('taskId');

        const tasksWorked = [...new Set(timeLogs.map(log => log.taskId._id.toString()))];
        const totalTime = timeLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
        const tasks = await Task.find({ userId: req.userId });
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const inProgress = tasks.filter(t => t.status === 'In Progress').length;
        const pending = tasks.filter(t => t.status === 'Pending').length;

        res.json({ tasksWorked, totalTime, completed, inProgress, pending });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};