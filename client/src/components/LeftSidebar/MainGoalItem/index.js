import React from "react";
import '../MainGoalList.scss';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const SHOW = "SHOW";
// const EDITING = "EDITING";
// const SAVING = "SAVING";
// const ERROR = "ERROR";

export default function MainGoalItem(props) {
  // const { mode, transition, back } = useVisualMode(SHOW);

  return (
    <li className={`main-goal-item ${props.selected && 'active'}`}>
      <header><h4 onClick={props.onSelect}>{props.title}</h4><FontAwesomeIcon className='trash' onClick={props.deleteGoal} icon={solid("trash")} /></header>
      {props.selected &&
        <progress className='progress1' value={props.barValue} max={props.barMax}> {props.barValue} </progress>}
    </li>
  );
}