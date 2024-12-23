const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, "Patient ID is required"],
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

