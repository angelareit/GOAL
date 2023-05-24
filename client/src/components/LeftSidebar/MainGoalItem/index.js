import React, { useState } from "react";
import useVisualMode from "../../../hooks/useVisualMode.js";
import './MainGoalItem.scss'

const SHOW = "SHOW";
const EDITING = "EDITING";
const SAVING = "SAVING";
const ERROR = "ERROR";



export default function MainGoalItem(props) {
  const { mode, transition, back } = useVisualMode(SHOW);

  return (
    <article className={`main-goal-item ${props.selected && 'active'}`} onClick={props.onSelect}>
      <span>{props.title}</span>
      {props.selected &&
        <progress className='progress1' value={props.barValue} max={props.barMax}> {props.barValue} </progress>}
    </article>
  );
}