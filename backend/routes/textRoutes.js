const express = require("express");
const router = express.Router();
const TextAnalysis = require("../models/textModel.js");

// POST route to save user data
router.post("/submit-text-analysis", async (req, res) => {
  const { fullName, gender, age, symptoms } = req.body;

  if (!fullName || !gender || !age || !symptoms || symptoms.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEntry = new TextAnalysis({ fullName, gender, age, symptoms });
    await newEntry.save();

    res
      .status(200)
      .json({ message: "Data saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Error saving data" });
  }
});

//get api to fetch the data
router.get("/get-text-analysis", async (req, res) => {
  try {
    const data = await TextAnalysis.find(); // Fetch all records
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;
