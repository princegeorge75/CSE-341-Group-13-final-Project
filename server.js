const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Import swagger documentation

// Import Routes
const authRoutes = require('./routes/auth'); // Authentication routes
const eventRoutes = require('./routes/events'); // Event routes
const registrationRoutes = require('./routes/registrations'); // Registration routes
const rsvpRoutes = require('./routes/rsvp'); // RSVP routes

// Initialize environment variables
dotenv.config();  // Load environment variables from .env file

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests
app.use(morgan('dev'));  // Log requests

// Set up session and passport for authentication
app.use(session({
  secret: process.env.SESSION_SECRET,  // Secret for session management
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Passport Configuration for OAuth
require('./config/passport');  // Passport config file for OAuth

// Swagger UI for API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  // Access Swagger docs at /api-docs

// Routes
app.use('/auth', authRoutes);  // Authentication routes (Signup/Login)
app.use('/events', eventRoutes);  // Event routes
app.use('/registrations', registrationRoutes);  // Registration routes
app.use('/rsvp', rsvpRoutes);  // RSVP routes

// Default route
app.get('/', (req, res) => res.send("Welcome to Event Manager API"));

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
