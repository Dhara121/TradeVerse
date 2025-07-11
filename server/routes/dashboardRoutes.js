const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getDashboard);

module.exports = router;
