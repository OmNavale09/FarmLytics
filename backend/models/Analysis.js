const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    cropName: {
      type: String,
      required: true,
    },

    diseaseName: {
      type: String,
    },

    diseaseConfidence: {
      type: Number,
    },

    severityLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    symptoms: String,
    preventionTips: String,
    treatment: String,

    aiRawResponse: String,

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);