import React, { useEffect, useState } from 'react';
import './Search.scss'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import useVisualMode from "../../hooks/useVisualMode.js";


const EDIT = "EDIT";
const SHOW = "SHOW";
const SENT = "SENT";
const ERROR = "ERROR";

export default function SearchResultCard(props) {
  const { mode, transition, back } = useVisualMode(props.state);
  const [messageValue, setMessageValue] = useState('Add me please');


  function onSendRequest(user, message) {
    axios.post('/search/request', { user: user, requestMessage: message })
      .then((res) => {
        transition(SENT);
      })
  }

  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSendRequest(props.buddy, messageValue);
    setMessageValue('Add me please');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    back(SENT);
    setMessageValue('Add me please');
  };


  return (
    <div className="search-result-tile">
      {mode === SHOW && <>
        <h3>{props.buddy.username}</h3>
        <button onClick={() => transition(EDIT)}>Send a Personalized message</button>
        <button onClick={handleSubmit}>Send a Quick Request</button>
      </>}
      {mode === SENT && <>
        <h3>Buddy Request Sent</h3>
        <h3>{props.buddy.username}</h3>
      </>}
      {mode === EDIT && <>
        <h3>{props.buddy.username}</h3>
        <form className='message-form' onSubmit={handleSubmit}>
          <input
            key="search-bar"
            value={messageValue}
            placeholder={"Find buddy by username"}
            onChange={(e) => {
              setMessageValue(e.target.value);
            }}
          />
          <div className='message-form-actions'>
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit">Send</button>
          </div>

        </form>
      </>}

    </div>
  )
}