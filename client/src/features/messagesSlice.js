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
    },
    deleteMessage: (state, action) => {
      const index = state.findIndex(m => m.id === action.payload.id);
      state[index].content = "";
    }
  }
});

// Action creators are generated for each case reducer function
export const { fetchMessageHistory, appendMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;