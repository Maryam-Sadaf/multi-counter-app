
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
  usernames: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      const newUser = action.payload;
      state.users.push(newUser);
      if (!state.usernames.includes(newUser.username)) {
        state.usernames.push(newUser.username);
      }
    },
  },
});
export const { createUser } = userSlice.actions;
export default userSlice.reducer;
