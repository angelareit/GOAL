import React, { useState } from "react";
import axios from "axios";
import { addNewGoal } from '../../../features/mainGoalSlice';
import { useSelector, useDispatch } from 'react-redux'

export default function Form(props) {
  const dispatch = useDispatch();

  const [mainGoal, setMainGoal] = useState(
    {
      title: "",
    }
  );
  const [error, setError] = useState("");


  const reset = function() {
    setMainGoal({ ...mainGoal, title: '' });
  }

  const handleSave = function() {
    validate();

    props.onSave()
    axios.put(`/mainGoals/new`, { mainGoal })
      .then((res) => {
        //update redux state for mainGoals
        console.log('NEW HERE', res.data.result);
        dispatch(addNewGoal(res.data.result));
      });


  }

  const handleCancel = function() {
    reset();
    props.onCancel();
  }

  function validate() {
    if (mainGoal.title === "") {
      setError("Goal title can't be blank");
      return;
    }

    setError("");
    reset();
  }


  return (
    <form onSubmit={handleSave}>
      <label className="" htmlFor="Title">
        Title
      </label>
      <input name="title" type="title" value={mainGoal.title} onChange={(event) => setMainGoal({...mainGoal, title: event.target.value})}/>
      <button type="submit" className="btn">
        CreateGoal
      </button>
      <button type="button" className="btn" onClick={handleCancel}>
        Back
      </button>
    </form>
  );
}