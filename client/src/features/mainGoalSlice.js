import { createSlice } from '@reduxjs/toolkit'

export const mainGoalSlice = createSlice({
  name: 'mainGoals',
  initialState: {
    value: [],
    active: {}
  },
  reducers: {
    addNewGoal: (state, action) => {
      console.log('Added new goal', state);
      state.value.push(action.payload);
    },
    setGoals: (state,action) => {
      state.value = action.payload;
      if(action.payload.length > 0)
      {
        state.active = state.value[0];
      }
    },
    resetGoals: (state,action) => {
      state.value = [];
    },
    setActiveGoal: (state, action) => {
      state.active=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addNewGoal, setGoals, resetGoals, setActiveGoal } = mainGoalSlice.actions;

export default mainGoalSlice.reducer;