const express = require("express");
const router = express.Router();
const ContactQuery = require("../models/contactModel");
const requireAdminAuth = require("../middleware/requireAdminAuth.js"); // admin middleware
const requireAuth = require("../middleware/requireAuth"); // The new user auth middleware

// API endpoint to receive contact queries (requires user authentication)
router.post("/contact-query", requireAuth, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newQuery = new ContactQuery({ name, email, message });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully!" });
  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({ error: "Failed to submit query." });
  }
});

// API endpoint to fetch all feedback/contact queries for the admin dashboard (requires admin authentication)
router.get("/feedback", requireAdminAuth, async (req, res) => {
  try {
    const feedback = await ContactQuery.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback." });
  }
});

// API endpoint to get the count of pending queries (requires admin authentication)
router.get("/feedback/pending-count", requireAdminAuth, async (req, res) => {
  try {
    const count = await ContactQuery.countDocuments({ status: "pending" });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching pending query count:", error);
    res.status(500).json({ error: "Failed to fetch pending query count." });
  }
});

// API endpoint to get the count of resolved queries (requires admin authentication)
router.get("/feedback/resolved-count", requireAdminAuth, async (req, res) => {
  try {
    const count = await ContactQuery.countDocuments({ status: "resolved" });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching resolved query count:", error);
    res.status(500).json({ error: "Failed to fetch resolved query count." });
  }
});

// API endpoint to delete a feedback query (requires admin authentication)
router.delete("/feedback/:id", requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuery = await ContactQuery.findByIdAndDelete(id);
    if (deletedQuery) {
      res.json({ message: "Query deleted successfully." });
    } else {
      res.status(404).json({ error: "Query not found." });
    }
  } catch (error) {
    console.error("Error deleting query:", error);
    res.status(500).json({ error: "Failed to delete query." });
  }
});

module.exports = router;