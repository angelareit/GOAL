import './GoalManager.scss';

export default function SubGoalCard(props) {
  const { subGoal } = props;
  return (
    <div key={subGoal.id} className='SubGoalCard'>
      <header className='sub-header'><h4>{subGoal.title}</h4><p>Created: {new Date(subGoal.created_at).toLocaleDateString()}</p></header>
      <div className='subgoal-body'>
        <p>{subGoal.note}</p>
        <p>{!subGoal.completed_on ? (subGoal.due_date ? `Deadline: ${new Date(subGoal.due_date).toLocaleDateString()}` : 'No Deadline') : (`Completed on: ${subGoal.completed_on}`)}</p>
      </div>
      <footer><button className='card-btn edit-btn' onClick={props.onEdit}>Edit</button><button className='card-btn delete-btn'>Delete</button></footer>
    </div>
  );
}