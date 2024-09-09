import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Create an async thunk to fetch data from the API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

// Create an async thunk to update a post
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, data }) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
  return response.data;
});

// Create an async thunk to delete a post
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
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
        const updatedPost = action.payload;
        const index = state.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        state.posts = state.posts.filter(post => post.id !== id);
      });
  },
});
export default postsSlice.reducer;
