import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import rightSidebarReducer from '../features/rightSidebarSlice'
import leftSidebarReducer from '../features/leftSidebarSlice'
import userReducer from '../features/userSlice'
import mainGoalReducer from '../features/mainGoalSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    rightSidebar: rightSidebarReducer,
    leftSidebar: leftSidebarReducer,
    user: userReducer,
    mainGoal: mainGoalReducer
  },
})