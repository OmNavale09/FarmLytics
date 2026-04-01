const Analysis = require("../models/Analysis");

/**
 * @desc    Save AI Analysis Result
 * @route   POST /api/analysis
 * @access  Private
 */
exports.createAnalysis = async (req, res) => {
  try {
    const {
      imageUrl,
      cropName,
      diseaseName,
      diseaseConfidence,
      severityLevel,
      symptoms,
      treatment,
      preventionTips,
    } = req.body;

    const analysis = await Analysis.create({
      user: req.user.id,
      imageUrl,
      cropName,
      diseaseName,
      diseaseConfidence,
      severityLevel,
      symptoms,
      treatment,
      preventionTips,
      aiRawResponse: JSON.stringify(req.body),
      status: "completed",
    });

    res.status(201).json({
      message: "Analysis saved successfully",
      analysis,
    });
  } catch (error) {
    console.error("Create Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
};


/**
 * @desc    Get logged-in user's analysis history
 * @route   GET /api/analysis
 * @access  Private
 */
exports.getUserAnalysis = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.json(analyses);
  } catch (error) {
    console.error("Get Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
};


/**
 * @desc    Get single analysis by ID
 * @route   GET /api/analysis/:id
 * @access  Private
 */
exports.getSingleAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found",
      });
    }

    // Ensure user owns this analysis
    if (analysis.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    res.json(analysis);
  } catch (error) {
    console.error("Single Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
};