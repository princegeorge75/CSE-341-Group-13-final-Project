const Registration = require('../models/Registration');
const Event = require('../models/Event');

// Register for an event
const registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.user; // Assumes JWT has the user's ID

  try {
    // Check if user is already registered for the event
    const existingRegistration = await Registration.findOne({ userId, eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event.' });
    }

    // Check if there are available spots
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const registrations = await Registration.find({ eventId });
    if (registrations.length >= event.maxAttendees) {
      return res.status(400).json({ message: 'No available spots for this event.' });
    }

    const registration = new Registration({
      userId,
      eventId,
      status: 'Pending',
    });

    await registration.save();
    res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error });
  }
};

// Admin approves registration
const approveRegistration = async (req, res) => {
  const registrationId = req.params.id;
  
  try {
    const registration = await Registration.findByIdAndUpdate(
      registrationId,
      { status: 'Approved' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    res.status(200).json({ message: 'Registration approved', registration });
  } catch (error) {
    res.status(500).json({ message: 'Error approving registration', error });
  }
};

// Admin denies registration
const denyRegistration = async (req, res) => {
  const registrationId = req.params.id;
  
  try {
    const registration = await Registration.findByIdAndUpdate(
      registrationId,
      { status: 'Denied' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    res.status(200).json({ message: 'Registration denied', registration });
  } catch (error) {
    res.status(500).json({ message: 'Error denying registration', error });
  }
};

module.exports = { registerForEvent, approveRegistration, denyRegistration };
