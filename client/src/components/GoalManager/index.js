import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './GoalManager.scss';
import axios from 'axios';

import FocusedGoal from './FocusedGoal';
import SubGoalCard from './SubGoalCard';
import SubGoalForm from './SubGoalForm';

export default function GoalManager(props) {

  const mainGoal = props.mainGoal;
  const [subGoal, setSubGoal] = useState({ id: null, children: [] });
  const [editing, setEditing] = useState(null);
  const [newGoal, setNewGoal] = useState(null);

  const setFocus = function(mainGoalID, subGoal) {
    axios.get('/subgoal', { params: { goal: mainGoalID, parent: subGoal.id } }).then(res => {
      setSubGoal({ ...subGoal, ...res.data });
    });
  };

  useEffect(() => {
    setFocus(mainGoal.id, subGoal);
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
    if (!newGoal.title) {
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
      main_goal_id: mainGoal.id,
      due_date: null,
      completed_on: null,
      priority: 50,
      parent_id: subGoal.id
    };

    setNewGoal(goalTemplate);
  };

  const renderedChildren = subGoal.children.map((c, i) => {
    return editing === c.id ? <SubGoalForm key={c.id} subGoal={c} onCancel={setEditing} index={i} saveChild={saveChild} /> : <SubGoalCard key={c.id} onEdit={() => setEditing(c.id)} onDelete={() => deleteChild(i, c.id)} onFocus={() => setFocus(mainGoal.id, c)} subGoal={c} />;
  });

  return (
    <div className='GoalManager'>

      <header className='structure'>{mainGoal.title}</header>
      <section className='focused-goal'>
        <section className='goal-details'>
          <FocusedGoal mainGoal={mainGoal} subGoal={subGoal} />
        </section>
        <section className='child-container'>
          {renderedChildren}
          {newGoal ? <SubGoalForm subGoal={newGoal} onCancel={() => { setNewGoal(null); }} index={-1} saveChild={saveNew} /> : <button className='add' onClick={addNewGoal}>+</button>}
        </section>
      </section>
    </div>
  );
}