const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middleware/authT'); // ✅ Import the auth middleware

// ✅ Apply verifyToken to all routes below
router.post('/', verifyToken, eventController.createEvent);        // POST - Create event
router.get('/', verifyToken, eventController.getEvents);           // GET - Get all events
router.get('/:id', verifyToken, eventController.getEvent);         // GET - Get event by ID
router.put('/:id', verifyToken, eventController.updateEvent);      // PUT - Update event by ID
router.delete('/:id', verifyToken, eventController.deleteEvent);   // DELETE - Delete event by ID

module.exports = router;
