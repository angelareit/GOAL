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
    <article className="main-goal-item">
      <span>{props.title}</span>
    </article>
  );
}