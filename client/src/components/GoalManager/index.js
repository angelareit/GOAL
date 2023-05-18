import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './GoalManager.scss';
import axios from 'axios';

import SubGoalCard from './SubGoalCard';
import SubGoalForm from './SubGoalForm';

export default function GoalManager(props) {

  const currentGoal = { id: 1 }; //props.currentGoal;
  const [subGoal, setSubGoal] = useState({ id: null, children: [] });
  const [editing, setEditing] = useState(null);
  const [newGoal, setNewGoal] = useState(null);

  useEffect(() => {

    axios.get('/subgoal', { params: { goal: currentGoal.id, parent: subGoal.id } }).then(res => {
      setSubGoal({ ...subGoal, ...res.data });
    });

  }, []);

  const saveChild = function(i, updatedGoal) {
    const children = [...subGoal.children];
    children[i] = updatedGoal;
    axios.put('/subgoal', { updatedGoal }).then(res => {
      setSubGoal({ ...subGoal, children: [...children] });
      console.log(updatedGoal);
    });
  };

  const saveNew = function(i, updatedGoal) {
    const children = [...subGoal.children];
    axios.post('/subgoal', { updatedGoal, parent_id: subGoal.id }).then(res => {
      setSubGoal({ ...subGoal, children: [...children, updatedGoal] });
      console.log(updatedGoal);
    });
  };

  const addNewGoal = function() {
    const goalTemplate = {
      id: 1,
      title: "Visit The Red Sea",
      note: "I will need to buy a ticket to Egypt.",
      main_goal_id: 1,
      due_date: "2024-07-01T00:00:00.000Z",
      completed_on: null,
      is_deleted: false,
      priority: 2,
      parent_id: null,
      created_at: "2023-05-17T19:21:09.819Z",
      updated_at: "2023-05-17T19:21:09.819Z"
    }
  }

  const renderedChildren = subGoal.children.map((c, i) => {
    return editing === c.id ? <SubGoalForm key={c.id} subGoal={c} onCancel={setEditing} index={i} saveChild={saveChild} /> : <SubGoalCard key={c.id} onEdit={() => setEditing(c.id)} subGoal={c} />;
  });

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