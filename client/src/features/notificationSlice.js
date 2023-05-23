import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    read  : false
  },
  reducers: {
    fetchNotifications: (state, action) => {
      console.log('session user', action);
      return { ...state, user: { ...action.payload } };
    },
    addNotification: (state, action) => {
      //let newNotif = state.notifications.push(action.payload)
      //return { ...state, notifications: newNotif };
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      //let newNotif = state.notifications.push(action.payload)
      //return { ...state, notifications: newNotif };
      state.notifications.push(action.payload);
    },
    resetNotifications: (state, action) => {
      return {
        ...state,
        notifications: []
      };
    },
    }
});

export const { fetchNotifications, addNotification, removeNotification, resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;