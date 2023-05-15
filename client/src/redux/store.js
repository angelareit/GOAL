import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import rightDrawerReducer from '../features/rightDrawerSlice'
import leftDrawerReducer from '../features/leftDrawerSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    rightDrawer: rightDrawerReducer,
    leftDrawer: leftDrawerReducer
  },
})