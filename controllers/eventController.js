// Import necessary models
const Event = require('../models/Event');

// Create an Event
const mongoose = require('mongoose');

exports.createEvent = async (req, res) => {
  try {
    if (!req.user?.id || !mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(401).json({ message: 'Invalid user ID in token' });
    }

    const newEvent = await Event.create({
      eventName: req.body.eventName,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      capacity: req.body.capacity,
      createdBy: req.user.id, // ✅ This should now be a valid ObjectId string
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};


// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// Get event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
};
