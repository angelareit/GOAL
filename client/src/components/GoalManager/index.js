import React, { useEffect, useState } from 'react';
import './GoalManager.scss';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import GoalStructure from './GoalStructure';
import FocusedGoal from './FocusedGoal';
import SubGoalCard from './SubGoalCard';
import SubGoalForm from './SubGoalForm';

// import { LinkedList } from '../../helpers/classes';
import { useSelector, useDispatch } from 'react-redux';
import { setEditing, setNewGoal, modifyHeadData, removeHead, prepend, reparentChild } from '../../features/goalManagerSlice';

export default function GoalBoard(props) {
  const dispatch = useDispatch();

  const mainGoal = useSelector(state => state.mainGoal.active);

  const goalStructure = useSelector(state => state.goalManager.goalStructure);
  const newGoal = useSelector(state => state.goalManager.newGoal);
  const editingID = useSelector(state => state.goalManager.editing);

  const [childRef, setChildRef] = useState(null);

  const setFocus = function(goal) {
    setChildRef(null);
    axios.get('/subgoal', { params: { goal } }).then(res => {
      dispatch(prepend({ goal, ...res.data }));
    });
  };

  const updateSubGoal = function(i, updatedGoal) {
    const subGoal = goalStructure.head.data;
    const children = [...subGoal.children];
    children[i] = updatedGoal;
    console.log(updatedGoal);
    axios.put('/subgoal', { updatedGoal }).then(res => {
      dispatch(modifyHeadData({ ...subGoal, children: [...children] }));
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
      dispatch(modifyHeadData({ ...subGoal, children: [...children, newGoal] }));
    });
  };

  const deleteSubGoal = function(index, id) {
    const subGoal = goalStructure.head.data;
    const children = [...subGoal.children];
    children.splice(index, 1);
    axios.delete('/subgoal', { params: { id } }).then(res => {
      dispatch(modifyHeadData({ ...subGoal, children: [...children] }));
      console.log(children);
    });
  };

  const addNewGoal = function() {
    dispatch(setEditing(null));
    const subGoal = goalStructure.head.data.goal;
    console.log("Subgoal: ", goalStructure.head.data);
    const goalTemplate = {
      title: "",
      note: "",
      main_goal_id: mainGoal.id,
      due_date: null,
      completed_on: null,
      priority: 50,
      parent_id: subGoal.main_goal_id ? subGoal.id : null
    };

    dispatch(setNewGoal(goalTemplate));
  };

  const reparent = function(subGoal) {
    if (!childRef) {
      return setChildRef(subGoal);
    }
    if (childRef.id === subGoal?.id) {
      return setChildRef(null);
    }
    axios.post('/subgoal/reparent', { parent: subGoal, child: childRef })
      .then(res => {
        dispatch(reparentChild({ parent: subGoal, child: childRef }));
      });
    setChildRef(null);
  };

  const subGoal = goalStructure.head.data;
  const renderedChildren = subGoal.children.map((c, i) => {
    // return editingID === c.id ? <SubGoalForm key={c.id} subGoal={c} onCancel={() => dispatch(setEditing(null))} index={i} saveChild={(goal) => updateSubGoal(i, goal)} /> : <SubGoalCard key={c.id} onClick={() => reparent(c)} onEdit={() => { dispatch(setNewGoal(null)); dispatch(setEditing(c.id)); }} onDelete={() => deleteSubGoal(i, c.id)} onFocus={() => setFocus(c)} subGoal={c} />;
    return editingID === c.id ? <SubGoalForm key={c.id} subGoal={c} onCancel={() => dispatch(setEditing(null))} index={i} saveChild={(goal) => updateSubGoal(i, goal)} /> : <SubGoalCard key={c.id} onEdit={() => { dispatch(setNewGoal(null)); dispatch(setEditing(c.id)); }} onDelete={() => deleteSubGoal(i, c.id)} onFocus={() => setFocus(c)} subGoal={c} />;
  });


  useEffect(() => {
    setChildRef(null);
    axios.get('/subgoal', { params: { goal: mainGoal } }).then(res => {
      dispatch(modifyHeadData({ goal: mainGoal, ...res.data }));
    });
  }, [mainGoal]);

  if (!mainGoal || !goalStructure.head) {
    return (
      <div className='GoalManager' />
    );
  }

  return (
    // <div className='GoalManager' onClick={() => { reparent(null); }}>
    <div className='GoalManager'>
      <GoalStructure chain={goalStructure} />
      <section className='focused-goal'>
        <section className='goal-details'>
          {goalStructure.head.data.goal && <FocusedGoal goal={goalStructure.head.data.goal} />}
        </section>
        <section className='child-container'>
          {renderedChildren}
          {newGoal ? <SubGoalForm subGoal={newGoal} onCancel={() => { dispatch(setNewGoal(null)); }} index={-1} saveChild={(goal) => saveNewSubGoal(goal)} /> : <button className='add' onClick={addNewGoal}><FontAwesomeIcon className='plus' icon={solid("circle-plus")} /></button>}
        </section>
      </section>
      {/* {goalStructure.head.next !== null && <button className="up" onClick={() => {
        setChildRef(null);
        dispatch(removeHead(goalStructure));
      }}>Back</button>} */}
      {goalStructure.head.next !== null && <button className="up">Back</button>}
    </div>
  );
}