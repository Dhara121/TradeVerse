import axios from 'axios';

const API_URL = 'https://api.twelvedata.com/price';

export const fetchLivePrice = async (symbol) => {
  const response = await axios.get(`${API_URL}?symbol=${symbol}&apikey=${import.meta.env.VITE_TWELVE_API_KEY}`);
  return response.data.price;
};
