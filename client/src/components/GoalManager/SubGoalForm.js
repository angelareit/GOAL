import { useState } from 'react';

import './GoalManager.scss';

export default function SubGoalForm(props) {

  const [subGoal, setSubGoal] = useState({ ...props.subGoal });

  const formattedDate = new Date(subGoal.due_date).toLocaleDateString('en-CA');

  const setDate = function(date) {
    setSubGoal({...subGoal, due_date: date ? date : null});
  };

  const setCompleted = function(data) {
    const completed_on = data ? new Date(Date.now()).toLocaleDateString('en-CA') : null;
    setSubGoal({ ...subGoal, completed_on });
  }

  return (
    <form key={subGoal.id} onSubmit={event => {
      event.preventDefault();
      props.saveChild(props.index, subGoal);
      props.onCancel(null);
    }} className='SubGoalForm'>
      <table>
        <tbody>
          <tr><td className='label'><label>Title</label></td><td className='input'><input type='text' defaultValue={subGoal.title} onChange={event => setSubGoal({ ...subGoal, title: event.target.value })}></input></td></tr>
          <tr><td className='label'><label>Note</label></td><td className='input'><textarea defaultValue={subGoal.note} onChange={event => setSubGoal({ ...subGoal, note: event.target.value })} ></textarea></td></tr>
          <tr><td className='label'><label>Priority</label></td><td className='input'><input type='range' min='0' max='100' defaultValue={subGoal.priority} onChange={event => setSubGoal({ ...subGoal, priority: Number(event.target.value) })}></input></td></tr>
          <tr><td className='label'><label>Deadline</label></td><td className='input'><input type='date' defaultValue={formattedDate} onChange={event => setDate(event.target.value)} ></input></td></tr>
          {props.index > 0 && <tr><td className='label'><label>Completed</label></td><td className='input'><input type='checkbox' defaultChecked={subGoal.completed_on !== null} onChange={event => setCompleted(event.target.checked)}></input></td></tr>}
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