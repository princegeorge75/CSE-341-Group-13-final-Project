const passport = require('passport');
const jwt = require('jsonwebtoken');

// OAuth handshake
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'], session: false });

// Google OAuth callback
const googleCallback = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign(
    {
      googleId: req.user.id,
      displayName: req.user.displayName,
      email: req.user.emails[0].value,
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );

  res.json({
    message: 'Authentication successful',
    token,
    user: {
      displayName: req.user.displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0]?.value,
    },
  });
};

// Middleware to protect JWT routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = { googleAuth, googleCallback, verifyToken };
