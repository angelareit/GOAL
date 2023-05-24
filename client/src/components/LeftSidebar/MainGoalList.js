import React from "react";
import MainGoalItem from "./MainGoalItem";
import { useDispatch } from 'react-redux';
import { setActiveGoal, deleteGoal } from '../../features/mainGoalSlice';

import axios from 'axios';

import './MainGoalList.scss';

export default function MainGoalList(props) {
  const dispatch = useDispatch();
  const myProgressState = useSelector((state) => state.session.myProgress.goalCounts)

  function onSelectMainGoal(goal) {
    dispatch(setActiveGoal(goal));
  }

  const deleteMainGoal = function(index, id) {
    axios.delete('/mainGoals', { params: { id } }).then(res => {
      console.log(res);
      if(res.data.success) {
        dispatch(deleteGoal(index));
      }
    });
  };

  const mainGoals = props.goals.map((goal, i) => {
    return <MainGoalItem
      key={goal.id}
      title={goal.title}
      selected={ goal.id === props.active.id}
      barValue = {   ( goalProgressData.completed_count / goalProgressData.total_count) * 100}
      barMax={100}
      onSelect={() => onSelectMainGoal(goal)}
      deleteGoal={() => deleteMainGoal(i, goal.id)}
    />;
  });

  return (
    <section className='main-goal-list'>
      <h4>Main Goals</h4>
      <ul> {mainGoals} </ul>
    </section>
  );

}