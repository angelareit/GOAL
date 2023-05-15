import { createSlice } from '@reduxjs/toolkit'

export const rightDrawerSlice = createSlice({
  name: 'rightDrawer',
  initialState: {
    value: 'hidden',
  },

  reducers: {
    showNotificationDrawer: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = state.value === 'showing_notifications' ? 'hidden' : 'showing_notifications' ;
    },
    showBuddyDrawer: (state) => {
      state.value = state.value === 'showing_buddy' ? 'hidden' : 'showing_buddy' ;
    },
  
  },
})

// Action creators are generated for each case reducer function
export const { showBuddyDrawer, showNotificationDrawer} = rightDrawerSlice.actions

export default rightDrawerSlice.reducer