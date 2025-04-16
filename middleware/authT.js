const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Log the token received in the header
    console.log("Token received:", token);

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');

    // Log the decoded token
    console.log("Decoded user:", decoded);

    // Attach the decoded user info to req.user
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
