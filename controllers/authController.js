const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Handle login via Google (after frontend gets token from Google)
const googleLogin = async (req, res) => {
  const { googleId, email, name, role } = req.body;

  if (!googleId || !email) {
    return res.status(400).json({ message: 'Missing googleId or email' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ googleId });

    // If not, create the user
    if (!user) {
      user = new User({
        googleId,
        email,
        name,
        role: role || 'user', // default role
      });
      await user.save();
    }

    // Generate JWT with MongoDB _id, not Google sub
    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Authentication successful', token });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = { googleLogin };
