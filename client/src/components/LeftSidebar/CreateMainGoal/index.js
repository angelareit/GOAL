import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useSelector, useDispatch } from 'react-redux';
import { addNewGoal } from '../../../features/mainGoalSlice';
import useVisualMode from "../../../hooks/useVisualMode.js";
import './CreateMainGoal.scss'
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

  function saveGoal(mainGoal) {
    transition(SAVING);
    axios.put(`/mainGoals/new`, { goal: mainGoal, userID: userState.id })
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
    <section className="create-main-goal">
      {mode === SHOW &&
        <div className='create-bttn' onClick={() => transition(CREATE)}>
          <span>Create New Goal</span>
        </div>
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={saveGoal} />}
      {mode === ERROR && <h3> ERROR COMPONENT </h3>}

    </section>
  );
}