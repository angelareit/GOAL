import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    fetchMessageHistory: (state, action) => {
      return action.payload;
    },
    appendMessage: (state, action) => {
      console.log(action.payload);
      return [...state, action.payload];
    }
  }
});

// Action creators are generated for each case reducer function
export const { fetchMessageHistory, appendMessage } = messagesSlice.actions;
export default messagesSlice.reducer;