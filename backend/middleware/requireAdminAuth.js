const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import your User model
const secretKey = 'yourSecretKey'; // Keep this VERY secure!  Move to a config file.

const requireAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Token is valid, check if user exists and is an admin
      const user = await User.findById(decoded.userId); //  'decoded.userId'  depends on what you store in the token
      if (!user) {
        return res.status(401).json({ error: 'Invalid token: User not found' }); // Or token expired
      }

      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized: Admin access required' }); // Forbidden
      }

      // User is an admin, attach user object to request
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error in requireAdminAuth:", error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = requireAdminAuth;