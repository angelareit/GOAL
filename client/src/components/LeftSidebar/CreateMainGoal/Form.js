import React, { useState } from "react";
import './CreateMainGoal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Form(props) {

  const [mainGoal, setMainGoal] = useState(
    {
      title: "",
    }
  );

  // eslint-disable-next-line
  const [error, setError] = useState("");

  const reset = function() {
    setMainGoal({ ...mainGoal, title: '' });
  };

  const handleSave = function() {
    validate();

    props.onSave(mainGoal);
  };

  const handleCancel = function() {
    reset();
    props.onCancel();
  };

  function validate() {
    if (mainGoal.title === "") {
      setError("Goal title can't be blank");
      return;
    }

    setError("");
    reset();
  }


  return (
    <section className="create-main-goal-form">
      <div>
        <h4>New Goal</h4>
        <FontAwesomeIcon className="iconbtn-circle" onClick={handleCancel} icon={solid("xmark")} />
      </div>

      <form onSubmit={handleSave}>
        <label htmlFor="Title">
          Title
        </label>
        <input name="title" type="text" value={mainGoal.title} onChange={(event) => setMainGoal({ ...mainGoal, title: event.target.value })} />

        <button type="submit">
          Create Goal
        </button>
      </form>
    </section>

  );
}