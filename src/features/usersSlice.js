import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/userApi';

const initialState = { data: [], status: 'idle', error: null, actionType: null };

export const fetchUsersAsync = createAsyncThunk('users/fetchUser', async () => {
  const response = await api.makeRequest('GET', '/posts');
  console.log("responseposts", response?.data);
  return response.data;
});

export const deleteUserAsync = createAsyncThunk('users/deleteUser', async (commentId) => {
  const response = await api.makeRequest('DELETE', `/posts/${commentId}`);
  console.log("response", response?.data);
  return response.data;
});

export const updatePostAsync = createAsyncThunk('users/updatePost', async ({ postId, newData }) => {
  const response = await api.makeRequest('PATCH', `/posts/${postId}`, newData);
  console.log("updatePostAsync - response", response?.data);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setActionType: (state, action) => {
      state.actionType = action.payload;
    },
  },
  extraReducers: (builder) => {
    const asyncReducers = [
      { asyncThunk: fetchUsersAsync, actionType: 'fetchUsersAsync' },
      { asyncThunk: deleteUserAsync, actionType: 'deleteUserAsync' },
      { asyncThunk: updatePostAsync, actionType: 'updatePostAsync' },
    ];

    asyncReducers.forEach(({ asyncThunk, actionType }) => {
      builder.addMatcher(
        (action) => action.type === asyncThunk.pending.toString(),
        (state) => {
          state.status = 'loading';
          state.error = null;
          state.actionType = actionType;
        }
      );

      builder.addMatcher(
        (action) => action.type === asyncThunk.fulfilled.toString(),
        (state, action) => {
          state.data = action.payload;
          state.status = 'success';
        }
      );
      builder.addMatcher(
        (action) => action.type === asyncThunk.rejected.toString(),
        (state, action) => {
          state.error = action.payload;
          state.status = 'error';
        }
      );
    });
  },
});
export const { setActionType } = usersSlice.actions;
export default usersSlice.reducer;
