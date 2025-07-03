const axios = require('axios');

const getStockTimeSeries = async (req, res) => {
  const { symbol = 'AAPL', interval = '1min' } = req.query;

  try {
    const response = await axios.get('https://api.twelvedata.com/time_series', {
      params: {
        symbol,
        interval,
        apikey: process.env.TWELVE_DATA_API_KEY
      }
    });

    if (response.data.status === 'error') {
      return res.status(400).json({ message: response.data.message });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stock data', detail: error.message });
  }
};

module.exports = { getStockTimeSeries };
