import React, { useState } from "react";
import axios from "axios";
import { setUser } from '../../../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import useVisualMode from "../../../hooks/useVisualMode.js";
import Form from "./Form";
import Header from "./Header";


const CREATE = "CREATE";
const SHOW = "SHOW";
const SAVING = "SAVING";
const ERROR = "ERROR";



export default function CreateMainGoal(props) {
  const { mode, transition, back } = useVisualMode(SHOW);


  //should this be a reducer function instead 
  function createMainGoal(goal) {
   

  }

  function saveGoal(name, goal) {
    transition(SAVING);
  }

  return (
    <article className="appointment" data-testid="appointment" >
      <Header mode={mode} />
      {mode === SHOW &&
        <button onClick={() => transition(CREATE)}> Create new Goal</button>
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={saveGoal} />}
    </article>
  );
}