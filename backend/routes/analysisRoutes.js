const express = require("express");
const {
  createAnalysis,
  getUserAnalysis,
} = require("../controllers/analysisController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAnalysis);
router.get("/", authMiddleware, getUserAnalysis);

module.exports = router;