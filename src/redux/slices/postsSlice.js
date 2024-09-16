import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:3333/posts';
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: data.title,
        body: data.body,
        // userId: 1,
      });
      return response.data;
    } catch (error) {
      console.log("API Error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});


export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  const response = await axios.post(API_URL, newPost);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post in the Redux store
        }
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.posts = state.posts.filter((post) => post.id !== id);
      });
  },
});

export default postsSlice.reducer;
