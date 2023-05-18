import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './GoalManager.scss';
import axios from 'axios';

import SubGoalCard from './SubGoalCard';

export default function GoalManager(props) {

  const currentGoal = { id: 1 } //props.currentGoal;
  const [subGoal, setSubGoal] = useState({ id: null, children: [] });

  useEffect(() => {
    
      axios.get('/subgoal', { params: { goal: currentGoal.id, parent: subGoal.id } }).then(res => {
        setSubGoal({...subGoal, ...res.data});
      });
      
  }, []);

  const renderedChildren = subGoal.children.map(c => {
    return <SubGoalCard subGoal={c}/>

  })

  return (
    <div className='GoalManager'>
      <header className='structure'>{currentGoal.title}</header>
      <section className='focused-goal'>
        <form className='goal-details'>
          <h2>Goal details for editing go here</h2>
        </form>
        <div className='child-container'>
          {renderedChildren}
          <button className='add'>+</button>
        </div>
      </section>
    </div>
  );
}