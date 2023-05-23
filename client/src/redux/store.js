import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import sessionReducer from '../features/sessionSlice';
import messagesReducer from '../features/messagesSlice';
import mainGoalReducer from '../features/mainGoalSlice';
import goalManagerReducer from '../features/goalManagerSlice';
import viewManagerReducer from '../features/viewManagerSlice';
import notificationReducer from '../features/notificationSlice';


export default configureStore({
  reducer: {
    counter: counterReducer,
    viewManager: viewManagerReducer,
    mainGoal: mainGoalReducer,
    goalManager: goalManagerReducer,
    messages: messagesReducer,
    session: sessionReducer,
    notification: notificationReducer
  },
});