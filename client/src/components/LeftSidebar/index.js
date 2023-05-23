import React, {useEffect} from 'react';
import './LeftSidebar.scss'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import CreateMainGoal from './CreateMainGoal'
import MainGoalList from './MainGoalList';


export default function LeftSidebar(props) {
  const drawerState = useSelector((state) => state.viewManager.leftSideBar)  
  const mainGoalState = useSelector((state) => state.mainGoal.value);
  const activeGoal = useSelector(state => state.mainGoal.active);
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
    drawerState.visibility &&
    <section className="left-sidebar">
      <MainGoalList goals={mainGoalState} active={activeGoal} />
      <CreateMainGoal />
    </section>
  )
}