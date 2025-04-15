const Event = require('../models/Event');  // Assuming your Event model is in models/Event.js

exports.createEvent = async (req, res) => {
  try {
    const { eventName, description, date, time, location } = req.body;

    // Ensure the user ID from the token is included in the event
    const createdBy = req.user.id;  // This is the decoded user ID from the JWT token

    // Create a new event with the user's ID as the 'createdBy' field
    const newEvent = new Event({ eventName, description, date, time, location, createdBy });

    // Save the new event to the database
    await newEvent.save();

    // Return the created event as a response
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving events', error: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving event', error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { eventName, description, date, time, location } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { eventName, description, date, time, location },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
};
