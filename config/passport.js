const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
},
(accessToken, refreshToken, profile, done) => {
  // Just pass the Google profile directly — no DB save
  return done(null, profile);
}));

// No session usage = no need for serializeUser or deserializeUser
