import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationList: [],
    buddyRequests: [],
    read: false
  },
  reducers: {
    fetchNotifications: (state, action) => {
      console.log('session user', action);
      return { ...state, user: { ...action.payload } };
    },
    addNotification: (state, action) => {
      //let newNotif = state.notifications.push(action.payload)
      //return { ...state, notifications: newNotif };
      state.notificationList.push(action.payload);
    },
    removeNotification: (state, action) => {
      //let newNotif = state.notifications.push(action.payload)
      //return { ...state, notifications: newNotif };
      state.notificationList.push(action.payload);
    },
    resetNotifications: (state, action) => {
      return { ...state, notifications: [] };
    },
    fetchBuddyRequests: (state, action) => {
      console.log('FETCH', action.payload);
      return {  ...state, buddyRequests: action.payload };
    },
  }
});

export const { fetchNotifications, addNotification, removeNotification, resetNotifications, fetchBuddyRequests } = notificationSlice.actions;
export default notificationSlice.reducer;