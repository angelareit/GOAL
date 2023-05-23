import './Home.scss';

export default function CreateGoalPrompt(props) {

  return (
    <div className='CreateGoalPrompt'>
      <h1>You do not have any goals. <span className="call-to-action" onClick={props.onClick}>Create one now!</span></h1>
    </div>
  );
}