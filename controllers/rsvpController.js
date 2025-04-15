const Rsvp = require('../models/Rsvp');

// Create a new RSVP
exports.createRsvp = async (req, res) => {
  try {
    const rsvp = new Rsvp(req.body);
    await rsvp.save();
    res.status(201).json(rsvp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all RSVPs
exports.getAllRsvps = async (req, res) => {
  try {
    const rsvps = await Rsvp.find().populate('userId eventId');
    res.status(200).json(rsvps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single RSVP
exports.getRsvpById = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id).populate('userId eventId');
    if (!rsvp) return res.status(404).json({ message: 'RSVP not found' });
    res.status(200).json(rsvp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update RSVP
exports.updateRsvp = async (req, res) => {
  try {
    const updated = await Rsvp.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'RSVP not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete RSVP
exports.deleteRsvp = async (req, res) => {
  try {
    const deleted = await Rsvp.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'RSVP not found' });
    res.status(200).json({ message: 'RSVP deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
