import { createSlice,current } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux';

export const mainGoalSlice = createSlice({
  name: 'mainGoals',
  initialState: {
    value: [],
    active: null
  },
  reducers: {
    addNewGoal: (state, action) => {
      console.log('before adding', current(state.value));

      state.value.push(action.payload);
      state.active = action.payload;
      console.log('Added new goal', current(state.value));
    },
    setGoals: (state,action) => {
      state.value = action.payload;
      if(action.payload.length)
      {
        state.active = state.value[0];
      }
    },
    resetGoals: (state,action) => {
      state.value = [];
      state.active=null;
    },
    setActiveGoal: (state, action) => {
      state.active=action.payload;
      console.log('ACTIVE GOAL', state.active);
    },
    deleteGoal: (state, action) => {
      state.value.splice(action.payload, 1);
      state.active = state.value.length ? state.value[state.value.length - 1] : null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNewGoal, setGoals, resetGoals, setActiveGoal, deleteGoal } = mainGoalSlice.actions;

export default mainGoalSlice.reducer;