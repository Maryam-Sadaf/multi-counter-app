import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import postsReducer from './slices/postsSlice';
import userReducer from './slices/userSlice'; // Correct import

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: userReducer,
  },
});

export default store;
