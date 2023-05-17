import { createSlice } from '@reduxjs/toolkit';

export const leftSidebarSlice = createSlice({
  name: 'leftSidebar',
  initialState: {
    value: 'hidden',
  },

  reducers: {
    showGoalListPanel: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = state.value === 'showing_goal_list' ? 'hidden' : 'showing_goal_list';
    },

  },
});

// Action creators are generated for each case reducer function
export const { showGoalListPanel: showGoalListPanel } = leftSidebarSlice.actions;

export default leftSidebarSlice.reducer;