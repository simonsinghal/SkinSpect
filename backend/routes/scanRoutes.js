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

// Merged Route: Handles Image Upload + User Details Together
router.post("/upload", upload.array("images", 2), async (req, res) => {
  try {
    const { userId, name, age, gender, symptoms, result } = req.body;
    const images = req.files.map((file) => file.path); // Store multiple image paths

    if (!userId || !name || !age || !gender || !symptoms || images.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newScan = new Scan({ userId, name, age, gender, images, symptoms, result });
    await newScan.save();

    res.json({ success: true, message: "Scan uploaded successfully!", data: newScan });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

//route to get scans
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching scans for user:", userId); // Debugging

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const scans = await Scan.find({ userId });

    if (!scans || scans.length === 0) {
      return res.status(404).json({ message: "No scans found for this user" });
    }

    res.json(scans);
  } catch (error) {
    console.error("Error fetching scans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
