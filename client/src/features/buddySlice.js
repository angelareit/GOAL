import { createSlice } from '@reduxjs/toolkit';

export const buddySlice = createSlice({
  name: 'buddy',
  initialState: {
    id: null,
    name: null,
    online: null
  },
  reducers: {
    setBuddy: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setBuddy } = buddySlice.actions;
export default buddySlice.reducer;