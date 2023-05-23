import { useState } from 'react';

import './GoalManager.scss';

export default function SubGoalForm(props) {

  const [subGoal, setSubGoal] = useState({ ...props.subGoal });

  const formattedDate = subGoal.due_date ? new Date(subGoal.due_date).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA');

  const setDeadline = function(date) {
    const deadline = date ? new Date(date) : null;
    console.log(deadline);
    setSubGoal({ ...subGoal, due_date: deadline });
  };

  const setCompleted = function(data) {
    const completed_on = data ? new Date(Date.now()) : null;
    console.log(completed_on);
    setSubGoal({ ...subGoal, completed_on });
  }

  return (
    <form key={subGoal.id} onSubmit={event => {
      event.preventDefault();
      props.saveChild(subGoal);
      props.onCancel(null);
    }} className='SubGoalForm'>
      <table>
        <tbody>
          <tr><td className='label'><label>Title</label></td><td className='input'><input type='text' defaultValue={subGoal.title} onChange={event => setSubGoal({ ...subGoal, title: event.target.value })}></input></td></tr>
          <tr><td className='label'><label>Note</label></td><td className='input'><textarea defaultValue={subGoal.note} onChange={event => setSubGoal({ ...subGoal, note: event.target.value })} ></textarea></td></tr>
          <tr><td className='label'><label>Priority</label></td><td className='input'><input type='range' min='0' max='100' defaultValue={subGoal.priority} onChange={event => setSubGoal({ ...subGoal, priority: Number(event.target.value) })}></input></td></tr>
          <tr><td className='label'><label>Deadline</label></td><td className='input'><input type='date' defaultValue={formattedDate} onChange={event => setDeadline(event.target.value)} ></input></td></tr>
          {subGoal.childrenIncomplete <= 0 && !subGoal.newGoal && 
            <tr><td className='label'><label>Completed</label></td>
            <td className='input'>
              <input type='checkbox' defaultChecked={subGoal.completed_on !== null} onChange={event => setCompleted(event.target.checked)}/> 
            </td></tr>
          }
        </tbody>
      </table>
      <footer>
        <button className='card-btn edit-btn'>Save</button>
        <button
          className='card-btn delete-btn'
          onClick={event => {
            event.preventDefault();
            props.onCancel(null);
          }}>
          Discard Changes
        </button>
      </footer>
    </form>
  );
}