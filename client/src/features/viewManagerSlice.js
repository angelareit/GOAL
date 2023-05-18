import { createSlice } from '@reduxjs/toolkit';

export const viewManagerSlice = createSlice({
  name: 'viewManager',
  initialState: {
    page: '',
    leftSideBar: { visibility: false, currentView: '' },
    rightSideBar: { visibility: false, currentView: '' },
    mainArea: { visibility: true, currentView: '' }
  },

  reducers: {
    switchPage: (state, action) => {
      state.page = action.payload;
    },
    resetViews: (state) => {
      state.leftSideBar = { visibility: false, currentView: '' };
      state.rightSideBar = { visibility: false, currentView: '' };
      state.mainArea = { visibility: true, currentView: '' };
      state.page = 'Landing';
    },
    //Right Side Bar
    showNotificationPanel: (state) => {
      if (state.rightSideBar.currentView !== 'notifications') {
        state.rightSideBar = { currentView: 'notifications', visibility: true };
      }
      else {
        state.rightSideBar = { visibility: !state.rightSideBar.visibility, currentView: 'notifications' };
      }
    },
    showBuddyPanel: (state) => {
      if (state.rightSideBar.currentView !== 'buddy') {
        state.rightSideBar = { currentView: 'buddy', visibility: true };
      }
      else {
        state.rightSideBar = { visibility: !state.rightSideBar.visibility, currentView: 'buddy' };
      }
    },
    showSearchPanel: (state) => {
      state.rightSideBar = { visibility: !state.rightSideBar.visibility, currentView: 'search' };
    },
    showRightSideBarContent: (state, action) => {
      state.rightSideBar = { visibility: !state.rightSideBar.visibility, currentView: action.payload };
    },
    hideRightSideBar: (state) => {
      state.rightSideBar = { ...state, visibility: false };
    },
    //Left Side Bar
    showGoalListPanel: (state) => {
      state.leftSideBar = { visibility: !state.leftSideBar.visibility, currentView: 'goal_list' };
    },
    showLeftSideBarContent: (state, action) => {
      state.leftSideBar = { visibility: !state.leftSideBar.visibility, currentView: action.payload };
    },
    hideLeftSideBar: (state) => {
      state.leftSideBar = { ...state, visibility: false };
    },


  },
});

// Action creators are generated for each case reducer function
export const {
  switchPage, resetViews,
  showNotificationPanel, showBuddyPanel, showSearchPanel, showRightSideBarContent, hideRightSideBar,
  showGoalListPanel, hideLeftSideBar, showLeftSideBarContent
} = viewManagerSlice.actions;

export default viewManagerSlice.reducer;