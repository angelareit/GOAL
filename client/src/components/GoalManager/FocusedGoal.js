import { useSelector } from "react-redux";

export default function FocusedGoal(props) {
  const { mainGoal, subGoal } = props;

  const mainGoalInterest = useSelector(state => state.session.interests[mainGoal.category_id]);

  const category = (subGoal.id || !mainGoalInterest) ? null : mainGoalInterest.name;

  const data = subGoal.id ? subGoal : mainGoal;

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.note}</p>
      {data.due_date && <p>Deadline: {new Date(subGoal.due_date).toLocaleDateString('en-CA')}</p>}
      {data.category_id && <p>Category: {category}</p>}
      {data.completed_on && <p>Completed on: {data.completed_on}</p>}
    </div>
  );
}