import React from "react";
import MainGoalItem from "./MainGoalItem";
import { useSelector, useDispatch } from 'react-redux';
import { addNewGoal, setActiveGoal } from '../../features/mainGoalSlice';
import { setNewGoalManager } from '../../features/goalManagerSlice';

import './MainGoalList.scss'

export default function MainGoalList(props) {
  const dispatch = useDispatch();
  const myProgressState = useSelector((state) => state.session.myProgress.goalCounts)

  function onSelectMainGoal(goal)
  {
    dispatch(setActiveGoal(goal));
  }

  console.log(myProgressState);
  const mainGoals = props.goals.map((goal) => {
    let goalProgressData = myProgressState.find(obj => obj.main_goal_id === goal.id);
    console.log('HERE YYYYO', goalProgressData);
    return <MainGoalItem
      key={goal.id}
      title={goal.title}
      selected={ goal.id === props.active.id}
      barValue = {   ( goalProgressData.completed_count / goalProgressData.total_count) * 100}
      barMax={100}
      onSelect={() => onSelectMainGoal(goal)}
    />
  });

  return (
    <section className='main-goal-list'>
      <h4>Main Goals</h4>
      <ul> {mainGoals} </ul>
    </section>
  );

}