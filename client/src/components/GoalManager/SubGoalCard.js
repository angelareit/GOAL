import './GoalManager.scss';

export default function SubGoalCard(props) {
  const { subGoal } = props;
  return (
    <div key={subGoal.id} className='SubGoalCard'>
      <header className='sub-header'><h3 onClick={props.onFocus}>{subGoal.title}</h3><p>Created: {new Date(subGoal.created_at).toLocaleDateString('en-CA')}</p></header>
      <div className='subgoal-body'>
        <p>{subGoal.note}</p>
        <p><b>Priority:</b> <progress value={subGoal.priority} max={100}>
          <span className="progress-bar">
            {subGoal.priority}/100
          </span>
        </progress></p>
        <p>{!subGoal.completed_on ? (subGoal.due_date ? `Deadline: ${new Date(subGoal.due_date).toLocaleDateString('en-CA')}` : 'No Deadline') : (`Completed on: ${subGoal.completed_on.toLocaleDateString('en-CA')}`)}</p>
      </div>
      <footer><button className='card-btn edit-btn' onClick={props.onEdit}>Edit</button><button className='card-btn delete-btn' onClick={props.onDelete}>Delete</button></footer>
    </div>
  );
}