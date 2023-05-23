import { createSlice } from '@reduxjs/toolkit';

export const viewManagerSlice = createSlice({
  name: 'viewManager',
  initialState: {
    page: 'landing',
    leftSideBar: { visibility: false, currentView: '' },
    rightSideBar: { visibility: false, currentView: '', currentTab: 'buddy-progress'},
    mainArea: { visibility: true, currentView: '' }
  },

  reducers: {
    switchPage: (state, action) => {
      state.page = action.payload;
    },
    resetViews: (state) => {
      state.leftSideBar = { visibility: false, currentView: '' };
      state.rightSideBar = { visibility: false, currentView: '', currentTab: 'buddy-progress' };
      state.mainArea = { visibility: true, currentView: '' };
      state.page = 'landing';
    },
    //Right Side Bar
    showNotificationPanel: (state) => {
      if (state.rightSideBar.currentView !== 'notifications') {
        state.rightSideBar = { ...state.rightSideBar, currentView: 'notifications', visibility: true };
      }
      else {
        state.rightSideBar = {...state.rightSideBar, visibility: !state.rightSideBar.visibility, currentView: 'notifications' };
      }
    },
    showBuddyPanel: (state) => {
      if (state.rightSideBar.currentView !== 'buddy') {
        state.rightSideBar = { ...state.rightSideBar,  visibility: true, currentView: 'buddy'};
      }
      else {
        state.rightSideBar = {  ...state.rightSideBar, visibility: !state.rightSideBar.visibility, currentView: 'buddy' };
      }
    },
    showSearchPanel: (state) => {
      state.rightSideBar = { ...state.rightSideBar,visibility: !state.rightSideBar.visibility, currentView: 'search' };
    },
    showAccountSettingsPanel: (state) => {
      state.rightSideBar = { ...state.rightSideBar, visibility: true, currentView: 'settings' };
    },
    showBuddyChatPanel: (state) => {
      state.rightSideBar = { ...state.rightSideBar, visibility: true, currentTab: 'buddy-chat' };
    },
    showBuddyProgressPanel: (state) => {
      state.rightSideBar = { ...state.rightSideBar, visibility: true, currentTab: 'buddy-progress' };
    },
    showRightSideBarContent: (state, action) => {
      state.rightSideBar = {  ...state.rightSideBar, visibility: !state.rightSideBar.visibility, currentView: action.payload };
    },
    hideRightSideBar: (state) => {
      state.rightSideBar = { ...state.rightSideBar, visibility: false };
    },
    //Left Side Bar
    showGoalListPanel: (state) => {
      state.leftSideBar = { visibility: !state.leftSideBar.visibility, currentView: 'goal-list' };
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
  showNotificationPanel, showBuddyPanel, showSearchPanel, showRightSideBarContent,
  showBuddyChatPanel, showBuddyProgressPanel, showAccountSettingsPanel, hideRightSideBar,
  showGoalListPanel, hideLeftSideBar, showLeftSideBarContent
} = viewManagerSlice.actions;

export default viewManagerSlice.reducer;