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
    console.log(updatedGoal);
    axios.put('/subgoal', { updatedGoal }).then(res => {
      setSubGoal({ ...subGoal, children: [...children] });
      console.log(updatedGoal);
    });
  };

  const saveNew = function(i, newGoal) {
    if(!newGoal.title) {
      return;
    }
    const children = [...subGoal.children];
    axios.post('/subgoal', { updatedGoal: newGoal }).then(res => {
      setSubGoal({ ...subGoal, children: [...children, newGoal] });
      console.log(newGoal);
    });
  };

  const deleteChild = function(index, id) {
    const children = [...subGoal.children];
    children.splice(index, 1);
    axios.delete('/subgoal', { params: { id } }).then(res => {
      setSubGoal({ ...subGoal, children: [...children] });
      console.log(children);
    });
  };

  const addNewGoal = function() {
    const goalTemplate = {
      title: "",
      note: "",
      main_goal_id: currentGoal.id,
      due_date: null,
      completed_on: null,
      priority: 50,
      parent_id: subGoal.id
    }

    setNewGoal(goalTemplate);
  }

  const renderedChildren = subGoal.children.map((c, i) => {
    return editing === c.id ? <SubGoalForm key={c.id} subGoal={c} onCancel={setEditing} index={i} saveChild={saveChild} /> : <SubGoalCard key={c.id} onEdit={() => setEditing(c.id)} onDelete={() => deleteChild(i, c.id)} subGoal={c} />;
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
          {newGoal ? <SubGoalForm subGoal={newGoal} onCancel={() => {setNewGoal(null)}} index={-1} saveChild={saveNew} /> : <button className='add' onClick={addNewGoal}>+</button>}
        </div>
      </section>
    </div>
  );
}