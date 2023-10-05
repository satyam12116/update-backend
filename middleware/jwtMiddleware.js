const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach decoded user information to the request object
    req.user = decodedToken;
    next();
  });
};

module.exports = authenticateToken;
