const Registration = require('../models/Registration');

// Approve or deny registration
const updateRegistrationStatus = async (req, res) => {
  const registrationId = req.params.id;
  const { status } = req.body; // 'approved' or 'denied'

  const updatedRegistration = await Registration.findByIdAndUpdate(registrationId, { status }, { new: true });
  res.status(200).json({ message: `Registration ${status}.`, updatedRegistration });
};
