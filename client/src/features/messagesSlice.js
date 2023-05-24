import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    list: [],
    newMessage: false
  },
  reducers: {
    fetchMessageHistory: (state, action) => {
      return {...state, list: action.payload};
    },
    appendMessage: (state, action) => {
      console.log(action.payload);
      // state.list.push(action.payload.message);
      return {...state, list: [...state.list, action.payload.message], newMessage: action.payload.newMessage};
    },
    deleteMessage: (state, action) => {
      const list = {...state.list};
      console.log(list);
      const message = state.list.find(m => {
        return m.id === action.payload.id
      });
      message.content = "";
      // console.log(index);
      // state.list[index].content = "";
    },
    messageRead: (state, action) => {
      state.newMessage = false; 
    }
  }
});

// Action creators are generated for each case reducer function
export const { fetchMessageHistory, appendMessage, deleteMessage, messageRead } = messagesSlice.actions;
export default messagesSlice.reducer;