const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secretKey = process.env.JWT_SECRET;


const requireAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // DEBUG

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid token: User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Unauthorized: Admin access required" });
    }

    // Now safe to log
    console.log("TOKEN:", token);
    console.log("DECODED:", decoded);
    console.log("USER FROM DB:", user);

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in requireAdminAuth:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = requireAdminAuth;
