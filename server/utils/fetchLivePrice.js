const axios = require("axios");

const fetchLivePrice = async (symbol) => {
  try {
    const response = await axios.get(`https://api.twelvedata.com/price`, {
      params: {
        symbol,
        apikey: process.env.TWELVE_DATA_API_KEY,
      },
    });

    if (response.data && response.data.price) {
      return parseFloat(response.data.price);
    } else {
      throw new Error("Price not available");
    }
  } catch (error) {
    console.error(`Error fetching live price for ${symbol}:`, error.message);
    return null; // Return null on failure
  }
};

module.exports = fetchLivePrice;
