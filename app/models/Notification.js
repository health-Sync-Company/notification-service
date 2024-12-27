const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: [true, "Patient ID is required"],
    },
    patientName: {
        type: String,
        required: [true, "Patient name is required"],
    },
    message: {
        type: String,
        required: [true, "Notification message is required"],
    },
    isSent: {
        type: Boolean,
        default: false,
    },
    sendAt: {
        type: Date,
        required: [true, "Send time is required"],
    },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);

