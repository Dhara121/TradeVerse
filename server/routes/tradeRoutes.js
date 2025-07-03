const express = require("express");
const router = express.Router();
const { placeTrade, getTrades } = require("../controllers/tradeController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", placeTrade);     // Buy or Sell
router.get("/", getTrades);       // Trade history

module.exports = router;
