// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ adjust for production later
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
