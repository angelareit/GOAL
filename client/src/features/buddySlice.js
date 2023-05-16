import { createSlice } from '@reduxjs/toolkit';

export const buddySlice = createSlice({
  name: 'buddy',
  initialState: {
    name: null,
    online: null
  },
  reducers: {
    setBuddy: (state, action) => {
      return { name: action.payload.name, online: action.payload.online };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setBuddy } = buddySlice.actions;
export default buddySlice.reducer;