import { createSlice } from '@reduxjs/toolkit';

export const interestsSlice = createSlice({
  name: 'interests',
  initialState: [],
  reducers: {
    setBuddy: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setBuddy } = interestsSlice.actions;
export default interestsSlice.reducer;