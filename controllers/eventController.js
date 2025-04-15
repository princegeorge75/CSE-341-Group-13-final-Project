const Event = require('../models/Event');

// Create an event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, description, date, time, location, capacity } = req.body;

    if (!eventName || !time || !req.user) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEvent = new Event({
      eventName,
      description,
      date,
      time,
      location,
      capacity,
      createdBy: req.user.sub || req.user.id
    });

    await newEvent.save();

    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'displayName email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// Get a single event by ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'displayName email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', event: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
};
