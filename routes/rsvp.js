const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');
const { verifyToken } = require('../middleware/authT'); //  Import the auth middleware

// Protected RSVP Routes
router.post('/', verifyToken, rsvpController.createRsvp);
router.get('/', verifyToken, rsvpController.getAllRsvps);
router.get('/:id', verifyToken, rsvpController.getRsvpById);
router.put('/:id', verifyToken, rsvpController.updateRsvp);
router.delete('/:id', verifyToken, rsvpController.deleteRsvp);

module.exports = router;
