import './Home.scss';

export default function CreateGoalPrompt(props) {

  return (
    <div className='CreateGoalPrompt'>
      <h2>You do not have any goals.</h2>
      <h3>Life is a journey. There is always more to learn and more to accomplish.</h3>
      <h1 className="call-to-action" onClick={props.onClick}>Set a new goal!</h1>
    </div>
  );
}