import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    user: null,
    buddy: { id: null, name: null, online: null },
    interests: [],
    mainGoals: [],
  },
  reducers: {
    setUser: (state, action) => {
      console.log('session user', action);
      return { ...state, user: {...action.payload} };
    },
    setBuddy: (state, action) => {
      return { ...state, buddy: action.payload };
    },
    setInterests: (state, action) => {
      return { ...state, interests: [...action.payload] };
    },
    resetSession: (state, action) => {
      return { ...state, 
        user: null, 
        buddy: { id: null, name: null, online: null },
        interests: [],
        mainGoals:[] 
      };
    },
    //MAIN GOAL STATE
    addNewGoal: (state, action) => {
      console.log('Added new goal', state);
      state.mainGoals.push(action.payload);
    },
    setGoals: (state,action) => {
      return { ...state, mainGoals: action.payload };
    },

  }
});

// Action creators are generated for each case reducer function
export const { setUser, setBuddy, setInterests, resetSession, addNewGoal, setGoals } = sessionSlice.actions;
export default sessionSlice.reducer;