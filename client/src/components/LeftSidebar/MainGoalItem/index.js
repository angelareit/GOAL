import React, { useState } from "react";
import useVisualMode from "../../../hooks/useVisualMode.js";

const SHOW = "SHOW";
const EDITING = "EDITING";
const SAVING = "SAVING";
const ERROR = "ERROR";



export default function MainGoalItem(props) {
  const { mode, transition, back } = useVisualMode(SHOW);

  return (
    <article className="mainGoal">
      <h3>{props.title}</h3>
    </article>
  );
}