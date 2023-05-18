import React from 'react';
import './GoalManager.scss';

export default function GoalManager() {

  return (
    <div className='GoalManager'>
      <section className='focused-goal'>
        <form className='goal-details'>
          <h2>Goal details for editing go here</h2>
        </form>
        <div className='child-container'>
          <div className='sub-goal'></div>
          <div className='sub-goal'></div>
          <div className='sub-goal'></div>
          <div className='sub-goal'></div>
          <button className='add'>+</button>
        </div>
      </section>
    </div>
  );
}