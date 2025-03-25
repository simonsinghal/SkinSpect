const express = require("express");
const multer = require("multer");
const Scan = require("../models/scanModel.js");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route to handle image uploads and user details
router.post("/upload", upload.array("images", 2), async (req, res) => {
  try {
    const { userId, result } = req.body;
    const images = req.files.map(file => file.path); // Store multiple image paths

    const newScan = new Scan({ userId, images, result });
    await newScan.save();

    res.json({ success: true, message: "Scan uploaded successfully!", data: newScan });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

module.exports = router;
