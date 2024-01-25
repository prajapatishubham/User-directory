import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/postApi';

const initialState = { postdata: [], poststatus: 'idle', posterror: null };
export const fetchPostsAsync = createAsyncThunk('posts/fetchPost', async () => {
  const response = await api.fetchPost(); 
  console.log("response",response?.data)
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        console.log("loading")
        state.poststatus = 'loading';
        state.posterror = null;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        console.log("loading")
        state.postdata = action.payload;
        state.poststatus = 'success';
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        console.log("loading")
        state.postdata = action.payload;
        state.poststatus = 'error';
      });
  },
});

export default postsSlice.reducer;
