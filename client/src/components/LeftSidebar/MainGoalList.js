import React from "react";
import MainGoalItem from "./MainGoalItem";
import { useDispatch } from 'react-redux';
import { setActiveGoal } from '../../features/mainGoalSlice';

import './MainGoalList.scss';

export default function MainGoalList(props) {
  const dispatch = useDispatch();

  function onSelectMainGoal(goal) {
    dispatch(setActiveGoal(goal));
  }
  const mainGoals = props.goals.map((goal) => {
    return <MainGoalItem
      key={goal.id}
      title={goal.title}
      selected={goal.id === props.active.id}
      onSelect={() => onSelectMainGoal(goal)}
    />;
  });

  return (
    <section className='main-goal-list'>
      <h4>Main Goals</h4>
      <ul> {mainGoals} </ul>
    </section>
  );

}