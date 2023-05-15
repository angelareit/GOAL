import { createSlice } from '@reduxjs/toolkit'

export const rightSidebarSlice = createSlice({
  name: 'rightSidebar',
  initialState: {
    value: 'hidden',
  },

  reducers: {
    showNotificationPanel: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = state.value === 'showing_notifications' ? 'hidden' : 'showing_notifications' ;
    },
    showBuddyPanel: (state) => {
      state.value = state.value === 'showing_buddy' ? 'hidden' : 'showing_buddy' ;
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { showBuddyPanel: showBuddyPanel, showNotificationPanel: showNotificationPanel} = rightSidebarSlice.actions

export default rightSidebarSlice.reducer