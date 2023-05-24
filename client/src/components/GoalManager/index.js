import React, { useEffect, useState } from 'react';
import './GoalManager.scss';
import axios from 'axios';
import socket from '../../helpers/socketsHelper';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

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
  const buddyState = useSelector((state) => state.session.buddy);
  const userState = useSelector((state) => state.session.user);


  const [childRef, setChildRef] = useState(null);

  const resetManagerSettings = function() {
    setChildRef(null);
    dispatch(setEditing(null));
  };

  const setFocus = function(goal) {
    // Fetch children from the database
    resetManagerSettings();
    axios.get('/subgoal', { params: { goal } }).then(res => {
      dispatch(prepend({ goal, ...res.data }));
    });
  };

  const updateSubGoal = function(i, updatedGoal) {
    const subGoal = { ...goalStructure.head.data };
    const children = [...subGoal.children];
    children[i] = updatedGoal;
    console.log(subGoal.goal.main_goal_id);
    if (subGoal.goal.main_goal_id) {
      const childrenIncomplete = children.filter(child => child.completed_on === null);
      subGoal.goal.childrenIncomplete = childrenIncomplete.length;
    }

    axios.put('/subgoal', { updatedGoal }).then(res => {
      dispatch(modifyHeadData({ ...subGoal, children: [...children] }));

      //emit socket emit for fetchProgress
      /*       if (updatedGoal.completed_on !== subGoal.goal.completed_on) {
              console.log('i get here', buddyState.id);
              socket.emit('BUDDY_PROGRESS_UPDATE', { ...buddyState });
            } */

      socket.emit('BUDDY_PROGRESS_UPDATE', { ...buddyState });
      socket.emit('MY_PROGRESS_UPDATE', { ...userState });

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
      console.log('NEW SUB GOAL', res.data);
      newGoal.id = res.data.id;
      newGoal.created_at = res.data.created_at;
      socket.emit('BUDDY_PROGRESS_UPDATE', { ...buddyState });
      socket.emit('MY_PROGRESS_UPDATE', { ...userState });

      dispatch(modifyHeadData({ ...subGoal, children: [...children, newGoal] }));
    });
  };

  const deleteSubGoal = function(index, id) {
    const subGoal = goalStructure.head.data;
    const children = [...subGoal.children];
    children.splice(index, 1);
    axios.delete('/subgoal', { params: { id } }).then(res => {
      dispatch(modifyHeadData({ ...subGoal, children: [...children] }));
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
      childrenIncomplete: 0,
      parent_id: subGoal.main_goal_id ? subGoal.id : null,
      newGoal: true
    };

    dispatch(setNewGoal(goalTemplate));
  };

  const reparent = function(subGoal) {
    dispatch(setNewGoal(null));
    dispatch(setEditing(null));
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
    return (editingID === c.id && !subGoal.goal.completed_on) ?
      <SubGoalForm
        key={c.id}
        subGoal={c}
        onCancel={() => dispatch(setEditing(null))}
        index={i}
        saveChild={(goal) => updateSubGoal(i, goal)} />
      :
      <SubGoalCard
        key={c.id}
        parentIncomplete={!subGoal.goal.completed_on}
        onEdit={() => { dispatch(setNewGoal(null)); dispatch(setEditing(c.id)); }}
        onDelete={() => deleteSubGoal(i, c.id)} onFocus={() => setFocus(c)}
        onMove={() => { reparent(c); }} subGoal={c} selected={childRef} />;
  });


  useEffect(() => {
    setChildRef(null);
    axios.get('/subgoal', { params: { goal: mainGoal } }).then(res => {
      dispatch(modifyHeadData({ goal: mainGoal, ...res.data }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainGoal]);

  if (!mainGoal || !goalStructure.head) {
    return (
      <div className='GoalManager' />
    );
  }

  return (
    <div className={`GoalManager ${childRef ? (goalStructure.head.next ? 'move-to-parent' : 'cancel-move') : ''}`} onClick={() => { reparent(null); }}>
      {/* // <div className='GoalManager'> */}
      <GoalStructure chain={goalStructure} />
      <section className={`focused-goal ${goalStructure.head.data.goal?.completed_on ? 'focused-complete' : ''}`}>
        <section className='goal-details'>
          {goalStructure.head.data.goal && <FocusedGoal goal={goalStructure.head.data.goal} />}
        </section>
        <section className='child-container'>
          {renderedChildren}
          {newGoal ? <SubGoalForm subGoal={newGoal} onCancel={() => { dispatch(setNewGoal(null)); }} index={-1} saveChild={(goal) => saveNewSubGoal(goal)} /> : <div className='card add' onClick={event => { event.stopPropagation(); addNewGoal(); }}><FontAwesomeIcon className='plus' icon={solid("circle-plus")} /></div>}
        </section>
      </section>
      {/* {goalStructure.head.next !== null && <button className="up" onClick={() => {
        setChildRef(null);
        dispatch(removeHead(goalStructure));
      }}>Back</button>} */}
      {goalStructure.head.next !== null && !childRef && <button className="up" onClick={() => {
        resetManagerSettings();
        dispatch(removeHead(goalStructure));
      }}>Back</button>}
    </div>
  );
}