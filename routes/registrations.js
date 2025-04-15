const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { verifyToken } = require('../middleware/authT'); //  Import token middleware

// 1. GET all registrations
router.get('/', verifyToken, async (req, res) => {
  try {
    const registrations = await Registration.find().populate('userId eventId');
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registrations', error: err });
  }
});

// 2. GET a specific registration by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate('userId eventId');
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching registration', error: err });
  }
});

// 3. POST a new registration
router.post('/', verifyToken, async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const newRegistration = new Registration({
      userId,
      eventId,
      status: 'Pending',
    });

    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (err) {
    res.status(500).json({ message: 'Error creating registration', error: err });
  }
});

// 4. PUT to update a registration
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    registration.status = req.body.status || registration.status;
    registration.updatedAt = Date.now();

    const updatedRegistration = await registration.save();
    res.status(200).json(updatedRegistration);
  } catch (err) {
    res.status(500).json({ message: 'Error updating registration', error: err });
  }
});

// 5. DELETE a registration
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.status(200).json({ message: 'Registration deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting registration', error: err });
  }
});

module.exports = router;
