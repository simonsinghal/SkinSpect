const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: { type: [String], required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Scan = mongoose.model("Scan", scanSchema);
module.exports = Scan;
