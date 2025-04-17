const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup
const signup = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const validPassword = await bcryptjs.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign(
    { userId: user._id.toString(), role: user.role }, // use _id
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ token });
};

