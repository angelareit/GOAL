import React, {useEffect} from 'react';
import './LeftSidebar.scss'
import axios from "axios";
import { setUser } from '../../features/sessionSlice';
import { setGoals } from '../../features/mainGoalSlice';

import { useSelector, useDispatch } from 'react-redux'
import CreateMainGoal from './CreateMainGoal'
import MainGoalList from './MainGoalList';


export default function LeftSidebar(props) {
  const drawerState = useSelector((state) => state.leftSidebar.value)  
  const mainGoalState = useSelector((state) => state.mainGoal.value);
  const dispatch = useDispatch();    

/*   useEffect(() => {
    axios.get('/mainGoals').then(res => {
      console.log('TESTING MAIN GOALS', res.data);
      if (res.data.success)
      {
        dispatch(setGoals(res.data.result));
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);
 */
  return (
    drawerState !== 'hidden' &&
    <section className="left-sidebar">
      <h3>{drawerState}</h3>
      <MainGoalList goals={mainGoalState} />
      <CreateMainGoal />
    </section>
  )
}