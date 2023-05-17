import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    buddy: { id: null, name: null, online: null },
    interests: {}
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, user: action.payload };
    },
    setBuddy: (state, action) => {
      return { ...state, buddy: { ...state.buddy, ...action.payload } };
    },
    setInterests: (state, action) => {
      return { ...state, interests: {...action.payload} };
    },
    updateInterest: (state, action) => {
      const { id, checked } = action.payload;
      return { ...state, interests: {...state.interests, [id]: {...state.interests[id], isInterest: checked }} }
    },
    resetSession: (state, action) => {
      return { ...state, user: null, buddy: { id: null, name: null, online: null }, interests: [] };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, setBuddy, setInterests, updateInterest, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;