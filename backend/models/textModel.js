const mongoose = require("mongoose");

const textAnalysisSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  age: Number,
  symptoms: [String],
  createdAt: { type: Date, default: Date.now }
});

const TextAnalysis = mongoose.model("TextAnalysis", textAnalysisSchema);
module.exports = TextAnalysis;
