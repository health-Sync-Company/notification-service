const express = require('express');
const router = express.Router();
const {
    scheduleNotification,
    getAllNotifications,
    markAsSent,
} = require('../controllers/notificationController');

router.post('/', scheduleNotification);
router.get('/', getAllNotifications);
router.put('/:id', markAsSent);

module.exports = router;

