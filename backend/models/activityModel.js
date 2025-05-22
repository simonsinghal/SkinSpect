const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activityType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  textAnalysisId: { type: mongoose.Schema.Types.ObjectId, ref: "TextAnalysis" }, 
  imageAnalysisId: { type: mongoose.Schema.Types.ObjectId, ref: "ImageAnalysis" }, 
    imageFilename: { type: String, required: false }, 
    inputDetails: { type: String, required: false }, 
    details: { type: String, required: false },

}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);