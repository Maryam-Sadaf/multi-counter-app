import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counters: [0],
  },
  reducers: {
    increment: (state, action) => {
      const index = action.payload;
      state.counters[index] += 1; 
    },
    decrement: (state, action) => {
      const index = action.payload;
      if (state.counters[index] > 0) {
        state.counters[index] -= 1; 
      }
    },
    addCounter: (state) => {
      if (state.counters.length < 5) {
        state.counters.push(0); 
      }
    },
    removeCounter: (state) => {
      if (state.counters.length > 1) {
        state.counters.pop(); 
      }
    },
    removeCounterByIndex: (state, action) => {
      const index = action.payload;
      if (state.counters.length > 1) {
        state.counters.splice(index, 1); 
        // splice Remove a counter from the array at a specific index
      }
    
    },
  },
});

export const { increment, decrement, addCounter, removeCounter, removeCounterByIndex } = counterSlice.actions;
export default counterSlice.reducer;
