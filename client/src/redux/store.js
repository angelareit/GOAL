import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import rightSidebarReducer from '../features/rightSidebarSlice';
import leftSidebarReducer from '../features/leftSidebarSlice';
import sessionReducer from '../features/sessionSlice';
import messagesReducer from '../features/messagesSlice';
import mainGoalReducer from '../features/mainGoalSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    rightSidebar: rightSidebarReducer,
    leftSidebar: leftSidebarReducer,
    user: userReducer,
    mainGoal: mainGoalReducer,
    buddy: buddyReducer,
    messages: messagesReducer
  },
});