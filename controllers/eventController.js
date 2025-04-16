// Import necessary models
const Event = require('../models/Event');

// Create an event
exports.createEvent = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { eventName, description, date, time, location, capacity } = req.body;

    // Check for missing required fields
    if (!eventName || !description || !date || !time || !location || !capacity || !req.user) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new event instance
    const newEvent = new Event({
      eventName,
      description,
      date,
      time,
      location,
      capacity, // Include the capacity field
      createdBy: req.user.sub || req.user.id, // Ensure the user ID is attached correctly
    });

    // Save the new event to the database
    await newEvent.save();

    // Respond with success
    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};
