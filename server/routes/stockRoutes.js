const express = require('express');
const router = express.Router();
const { getStockTimeSeries } = require('../controllers/stockController');

router.get('/price', getStockTimeSeries);

module.exports = router;
