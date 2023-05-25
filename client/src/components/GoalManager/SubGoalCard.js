import './GoalManager.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function SubGoalCard(props) {
  const { subGoal, selected } = props;
  const isSelected = subGoal.id === selected?.id;

  return (
    <div
      key={subGoal.id}
      onClick={event => {
        event.stopPropagation();
        if (selected && !isSelected) {
          return props.onMove();
        }
      }}
      className={`SubGoalCard card ${subGoal.completed_on ? 'child-complete' : ''} ${selected ? (isSelected ? 'selected' : 'not-selected') : ''}`}>
      {/* <div key={subGoal.id} className='SubGoalCard' onClick={event => {event.stopPropagation(); props.onClick(); }}> */}

      <header className='sub-header'>

        <div className='col left header-label'>
          <h3 onClick={event => { props.onFocus(); }}>{subGoal.title}</h3>
          <p>Created: {new Date(subGoal.created_at).toLocaleDateString('en-CA')}</p>
        </div>
        {props.parentIncomplete &&
          <div className='actions'>
            {!selected &&
              <FontAwesomeIcon className='card-btn edit-btn' onClick={props.onEdit} icon={solid("pen-to-square")} />
            }
            {(!selected || isSelected) &&
              <FontAwesomeIcon className='card-btn move-btn' onClick={props.onMove} icon={isSelected ? solid("xmark") : regular("hand-back-fist")} />
            }
            {!selected &&
              <FontAwesomeIcon className='card-btn delete-btn' onClick={props.onDelete} icon={solid("trash")} />
            }
          </div>}
      </header>

      <div className='subgoal-body'>
        {subGoal.completed_on && <h3 className='completed'> Completed!</h3>}
        {subGoal.note && <p className='note'>{subGoal.note}</p>}
        <div>
        {subGoal.priority > 0 &&
          <p><b>Priority:</b> <progress className='progress1' value={subGoal.priority} max={100}>
            <span className="progress-bar">
              {subGoal.priority}/100
            </span>
          </progress></p>
        }

        {subGoal.completed_on || subGoal.due_date ?
          <p className='deadline'>{!subGoal.completed_on ? (subGoal.due_date ? `Due on ${new Date(subGoal.due_date).toLocaleDateString('en-CA')}` : '') : (`Completed on: ${new Date(subGoal.completed_on).toLocaleDateString('en-CA')}`)}</p>
          : null}

        {!subGoal.note && subGoal.priority === 0 && !subGoal.due_date && !subGoal.completed_on &&
          <div className='col noInfo'>
            <p>no details</p>
            <span>edit to add more information</span>
          </div>
        }
        </div>


      </div>


    </div>
  );
}