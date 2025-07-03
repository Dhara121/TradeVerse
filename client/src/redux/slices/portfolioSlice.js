// src/redux/slices/portfolioSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await axiosInstance.get('/user/portfolio', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error loading portfolio');
    }
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    holdings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.holdings = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default portfolioSlice.reducer;
