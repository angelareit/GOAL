import { useSelector } from "react-redux";

import './GoalManager.scss';

export default function FocusedGoal(props) {
  const data = props.goal;

  const mainGoalInterest = useSelector(state => state.session.interests[data.category_id]);

  const category = mainGoalInterest ? mainGoalInterest.name : null;

  return (
    <div className='FocusedGoal'>
      <h1>{data.title}</h1>
      <p className='note'>{data.note}</p>
      <section className='details'>
        {data.due_date && <p><b>Deadline:</b> {new Date(data.due_date).toLocaleDateString('en-CA')}</p>}
        {data.category_id && <p><b>Category:</b> {category}</p>}
        {data.completed_on && <p><b>Completed on:</b> {new Date(data.completed_on).toLocaleDateString('en-CA')}</p>}
      </section>
    </div>
  );
}