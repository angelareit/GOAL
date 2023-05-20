import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './GoalManager.scss';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import GoalStructure from './GoalStructure';
import FocusedGoal from './FocusedGoal';
import SubGoalCard from './SubGoalCard';
import SubGoalForm from './SubGoalForm';

import { LinkedList } from '../../helpers/classes';

export default function GoalManager(props) {

  const mainGoal = props.mainGoal;
  // const [subGoal, setSubGoal] = useState({ id: null, children: [] });
  const [editing, setEditing] = useState(null);
  const [newGoal, setNewGoal] = useState(null);
  const [goalStructure, setGoalStructure] = useState(new LinkedList({ goal: mainGoal, children: [] }));

  const setFocus = function(goal) {
    axios.get('/subgoal', { params: { goal } }).then(res => {
      setGoalStructure(LinkedList.prepend(goalStructure, { goal, ...res.data }));
    });
  };

  useEffect(() => {
    setFocus(mainGoal);
  }, []);

  const updateSubGoal = function(i, updatedGoal) {
    const subGoal = goalStructure.head.data;
    const children = [...subGoal.children];
    children[i] = updatedGoal;
    console.log(updatedGoal);
    axios.put('/subgoal', { updatedGoal }).then(res => {
      setGoalStructure(LinkedList.modifyHeadData(goalStructure, { ...subGoal, children: [...children] }));
      console.log(updatedGoal);
    });
  };

  const saveNewSubGoal = function(newGoal) {
    if (!newGoal.title) {
      return;
    }
    const subGoal = { ...goalStructure.head.data };
    const children = [...subGoal.children];
    axios.post('/subgoal', { newGoal }).then(res => {
      console.log(res.data);
      newGoal.id = res.data.id;
      newGoal.created_at = res.data.created_at;
      setGoalStructure(LinkedList.modifyHeadData(goalStructure, { ...subGoal, children: [...children, newGoal] }));
    });
  };

  const deleteSubGoal = function(index, id) {
    console.log(id);
    const subGoal = goalStructure.head.data;
    const children = [...subGoal.children];
    children.splice(index, 1);
    axios.delete('/subgoal', { params: { id } }).then(res => {
      setGoalStructure(LinkedList.modifyHeadData(goalStructure, { ...subGoal, children: [...children] }));
      console.log(children);
    });
  };

  const addNewGoal = function() {
    setEditing(null);
    const subGoal = goalStructure.head.data.goal;
    console.log("Subgoal: ", subGoal);
    const goalTemplate = {
      title: "",
      note: "",
      main_goal_id: mainGoal.id,
      due_date: null,
      completed_on: null,
      priority: 50,
      parent_id: subGoal.main_goal_id ? subGoal.id : null
    };

    setNewGoal(goalTemplate);
  };

  const subGoal = goalStructure.head.data;
  const renderedChildren = subGoal.children.map((c, i) => {
    console.log(c);
    return editing === c.id ? <SubGoalForm key={c.id} subGoal={c} onCancel={setEditing} index={i} saveChild={(goal) => updateSubGoal(i, goal)} /> : <SubGoalCard key={c.id} onEdit={() => { setNewGoal(null); setEditing(c.id); }} onDelete={() => deleteSubGoal(i, c.id)} onFocus={() => setFocus(c)} subGoal={c} />;
  });

  return (
    <div className='GoalManager'>

      <GoalStructure chain={goalStructure} />
      <section className='focused-goal'>
        <section className='goal-details'>
          <FocusedGoal goal={goalStructure.head.data.goal} />
        </section>
        <section className='child-container'>
          {renderedChildren}
          {newGoal ? <SubGoalForm subGoal={newGoal} onCancel={() => { setNewGoal(null); }} index={-1} saveChild={(goal) => saveNewSubGoal(goal)} /> : <button className='add' onClick={addNewGoal}><FontAwesomeIcon className='plus' icon={solid("circle-plus")} /></button>}
        </section>
      </section>
      {goalStructure.head.next !== null && <button className="up" onClick={() => setGoalStructure(LinkedList.removeHead(goalStructure))}>Back</button>}
    </div>
  );
}