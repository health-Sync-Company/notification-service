const Notification = require('../models/Notification');
const Appointment = require('../models/Appointment');

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

// Automated reminder for upcoming appointments
const sendUpcomingReminders = async () => {
    try {
        const now = new Date();
        const upcomingAppointments = await Appointment.find({
            date: { $gte: now, $lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) }, // Next 24 hours
        }).populate('patientId');

        upcomingAppointments.forEach(async (appointment) => {
            const message = `Reminder: You have an appointment scheduled on ${appointment.date.toLocaleString()}`;
            await Notification.create({
                patientId: appointment.patientId._id,
                message,
                sendAt: appointment.date,
            });
            console.log(`Notification scheduled for patient ${appointment.patientId.name}`);
        });
    } catch (error) {
        console.error('Error sending reminders:', error.message);
    }
};


module.exports = {
    scheduleNotification,
    getAllNotifications,
    markAsSent,
    sendUpcomingReminders,
};
