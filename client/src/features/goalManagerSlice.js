import { LinkedList } from '../helpers/classes';

import { createSlice } from '@reduxjs/toolkit';

export const goalManagerSlice = createSlice({
  name: 'goalManager',
  initialState: {
    goalStructure: new LinkedList({ id: null, children: [] }),
    editing: null,
    newGoal: null
  },
  reducers: {
    
    setEditing: (state, action) => {
      return { ...state, editing: action.payload };
    },
    setNewGoal: (state, action) => {
      return { ...state, newGoal: action.payload };
    },
    modifyHeadData: (state, action) => {
      return { ...state, goalStructure: LinkedList.modifyHeadData(state.goalStructure, action.payload) };
    },
    removeHead: (state, action) => {
      return { ...state, goalStructure: LinkedList.removeHead(state.goalStructure) };
    },
    prepend: (state, action) => {
      return { ...state, goalStructure: LinkedList.prepend(state.goalStructure, action.payload) };
    },
    reparentChild: (state, action) => {
      const newParent = action.payload.parent;
      const child = action.payload.child;
      const children = [...state.goalStructure.head.data.children];
      const childIndex = children.findIndex(c => c === child);
      children.splice(childIndex, 1);
      const next = state.goalStructure.head.next ? {...state.goalStructure.head.next} : null;
      if(newParent){
        return { ...state, goalStructure: LinkedList.modifyHeadData(state.goalStructure, {...state.goalStructure.head.data, children: children } ) };
      }
      if(next !== null) {
        next.data.children.push(child);
        return { ...state, goalStructure: LinkedList.modifyHead({...state.goalStructure.head.data, children: children }, {...next} ) };
      }
    },
    resetGoalManager: (state, action) => {
      return {
        goalStructure: new LinkedList({ id: null, children: [] }),
        editing: null,
        newGoal: null
      };
    },
    setNewGoalManager: (state, action) => {
      console.log('setting new tree', action);
      return {
        goalStructure: new LinkedList({ id: action.payload, children: [] }),
        editing: null,
        newGoal: null
      };
    }
  },
});

// Action creators are generated for each case reducer function
export const { setEditing, setNewGoal, modifyHeadData, removeHead, prepend, setNewGoalManager, resetGoalManager, reparentChild } = goalManagerSlice.actions;

export default goalManagerSlice.reducer;