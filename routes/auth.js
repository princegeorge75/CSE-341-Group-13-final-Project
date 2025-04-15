const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Google OAuth start
router.get('/google', passport.authenticate('google', {
  scope: ['openid', 'email', 'profile'],
  session: false
}));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/' }), (req, res) => {
  const user = req.user;

  // Generate a JWT token valid for 10 minutes
  const token = jwt.sign(
    {
      sub: user.id,
      name: user.displayName,
      email: user.emails[0].value
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );

  // Return the token to the user directly
  return res.json({
    message: 'Authentication successful',
    token,
    expiresIn: '10 minutes'
  });
});

module.exports = router;
