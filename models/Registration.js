const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',  // Reference to the 'User' model
    required: true 
  },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event',  // Reference to the 'Event' model
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Denied'],  // Status options for the registration
    default: 'Pending'  // Default to 'Pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now  // Automatically sets the registration creation time
  }
});

// Create and export the model
module.exports = mongoose.model('Registration', registrationSchema);
