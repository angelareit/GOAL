import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import sessionReducer from '../features/sessionSlice';
import messagesReducer from '../features/messagesSlice';
import mainGoalReducer from '../features/mainGoalSlice'
import viewManagerReducer  from '../features/viewManagerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    viewManager: viewManagerReducer,
    mainGoal: mainGoalReducer,
    messages: messagesReducer,
    session: sessionReducer
  },
});