// src/redux/stockSlice.js
import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    prices: {},       // e.g., { AAPL: 191.24, GOOGL: 2751.89 }
    loading: false,
    error: null,
  },
  reducers: {
    fetchPriceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPriceSuccess: (state, action) => {
      const { symbol, price } = action.payload;
      state.prices[symbol] = price;
      state.loading = false;
    },
    fetchPriceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPriceStart,
  fetchPriceSuccess,
  fetchPriceFailure,
} = stockSlice.actions;

export default stockSlice.reducer;
