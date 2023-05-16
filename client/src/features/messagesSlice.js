import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    all: (state, action) => {
      return action.payload;
    },
    append: (state, action) => {
      return [state, action.payload];
    }
  }
});

// Action creators are generated for each case reducer function
export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;