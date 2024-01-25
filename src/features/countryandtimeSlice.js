import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/countryandtimeApi'; // Assuming API functions are in api.js

const initialState = {
  countries: [],
  currentTime: '',
  status: 'idle',
  error: null,
};

export const fetchCountriesAsync = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await api.fetchCountries();
  return response;
});

export const fetchCurrentTimeAsync = createAsyncThunk('currentTime/fetchCurrentTime', async (timezone) => {
  const response = await api.fetchCurrentTime(timezone);
  return response;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {}, // No additional reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountriesAsync.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCountriesAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      });
  },
});

const currentTimeSlice = createSlice({
  name: 'currentTime',
  initialState,
  reducers: {}, // No additional reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentTimeAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentTimeAsync.fulfilled, (state, action) => {
        state.currentTime = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCurrentTimeAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'error';
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
export const currentTimeReducer = currentTimeSlice.reducer;


