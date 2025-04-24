const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secretKey = process.env.JWT_SECRET;

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header (requireAuth):", authHeader); // DEBUG

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid token: User not found" });
    }

    console.log("TOKEN (requireAuth):", token);
    console.log("DECODED (requireAuth):", decoded);
    console.log("USER FROM DB (requireAuth):", user);

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    console.error("Error in requireAuth:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = requireAuth;