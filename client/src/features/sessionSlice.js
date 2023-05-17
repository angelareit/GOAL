import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    buddy: { id: null, name: null, online: null },
    interests: []
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, value: action.payload };
    },
    setBuddy: (state, action) => {
      return { ...state, buddy: action.payload };
    },
    setInterests: (state, action) => {
      return { ...state, interests: [...action.payload] };
    },
    resetSession: (state, action) => {
      return { ...state, value: null, buddy: { id: null, name: null, online: null }, interests: [] };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, setBuddy, setInterests, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;