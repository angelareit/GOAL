import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import rightSidebarReducer from '../features/rightSidebarSlice';
import leftSidebarReducer from '../features/leftSidebarSlice';
import userReducer from '../features/userSlice';
import buddyReducer from '../features/buddySlice';
import messagesReducer from '../features/messagesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    rightSidebar: rightSidebarReducer,
    leftSidebar: leftSidebarReducer,
    user: userReducer,
    buddy: buddyReducer,
    messages: messagesReducer
  },
});