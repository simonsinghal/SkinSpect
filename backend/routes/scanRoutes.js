const express = require("express");
const multer = require("multer");
const Scan = require("../models/scanModel.js");
const Activity = require('../models/activityModel');

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
  console.log("Scan Upload - Request Body:", req.body);
  console.log("Scan Upload - Request Files:", req.files);
  try {
    const { userId, name, age, gender, symptoms, result } = req.body;
    const images = req.files.map((file) => file.path);

    if (!userId || !name || !age || !gender || !symptoms || images.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newScan = new Scan({ userId, name, age, gender, images, symptoms, result });
    await newScan.save();

    console.log("Scan Upload - Scan Saved:", newScan);

    // Log activity
    console.log("Activity Logging - userId:", userId);
    const newActivity = new Activity({
      userId: userId,
      activityType: "Image Scan Uploaded",
      timestamp: new Date(),
    });
    await newActivity.save();

    console.log("Activity Logging - Activity Saved");

    res.json({ success: true, message: "Scan uploaded successfully!", data: newScan });
  } catch (error) {
    console.error("Scan Upload - Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// Route to get scans for a specific user
router.get("/:userId", async (req, res) => {
  console.log("GET /:userId called"); 
  console.log("Request Params:", req.params);
  try {
    const { userId } = req.params;
    console.log("Fetching scans for user:", userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const scans = await Scan.find({ userId });

    if (!scans || scans.length === 0) {
      return res.status(404).json({ message: "No scans found for this user" });
    }

    // Convert imageUrl to images array if necessary
    const formattedScans = scans.map((scan) => {
      if (scan.imageUrl && !scan.images) {
        return { ...scan.toObject(), images: [scan.imageUrl] };
      }
      return scan.toObject();
    });

    res.json(formattedScans);
  } catch (error) {
    console.error("Error fetching scans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;