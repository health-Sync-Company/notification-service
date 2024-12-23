const Notification = require('../models/Notification');

// Schedule a notification
const scheduleNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('patientId');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark a notification as sent
const markAsSent = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isSent: true }, { new: true });
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    scheduleNotification,
    getAllNotifications,
    markAsSent,
};
