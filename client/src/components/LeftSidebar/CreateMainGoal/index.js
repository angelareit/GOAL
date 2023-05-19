import React, { useState } from "react";
import axios from "axios";
import { setUser } from '../../../features/sessionSlice';
import { useSelector, useDispatch } from 'react-redux';
import useVisualMode from "../../../hooks/useVisualMode.js";
import { addNewGoal } from '../../../features/mainGoalSlice';
import Form from "./Form";
import Header from "./Header";


const CREATE = "CREATE";
const SHOW = "SHOW";
const SAVING = "SAVING";
const ERROR = "ERROR";



export default function CreateMainGoal(props) {
  const { mode, transition, back } = useVisualMode(SHOW);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);

  //todo: add error component and give it a cancel function that will send transition back to show

  function saveGoal(mainGoal) {
    transition(SAVING);
    axios.put(`/mainGoals/new`, { goal: mainGoal, userID: userState.id  })
      .then((res) => {
        //update redux state for mainGoals
        if (res.data.success) {
          console.log('NEW HERE', res.data.result);
          dispatch(addNewGoal(res.data.result));
          transition(SHOW);
        }
      }).catch((err) => {
        transition(ERROR);
      });
  }

  return (
    <article className="appointment" data-testid="appointment" >
      <Header mode={mode} />
      {mode === SHOW &&
        <button onClick={() => transition(CREATE)}> Create new Goal</button>
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={saveGoal} />}
      {mode === ERROR && <h3> ERROR COMPONENT </h3>}

    </article>
  );
}