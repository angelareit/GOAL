import React from "react";
import './Notifications.scss';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { fetchPendingBuddyRequests, fetchSentBuddyRequests } from '../../../features/notificationSlice';
import useVisualMode from "../../../hooks/useVisualMode.js";

const SHOW = "SHOW";
const REJECTED = "REJECTED";
const ACCEPTED = "ACCEPTED";
// const ERROR = "ERROR";

export default function RequestCard(props) {
  const { mode, transition } = useVisualMode(props.state);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      // Fetch pending buddy requests
      await axios.get("/request/incoming").then(res => {
        console.log('PENDING BUDDY REQUEST', res.data);
        dispatch(fetchPendingBuddyRequests(res.data));
      }).catch((err) => {
        console.log(err);
      });

      // Fetch outgoing buddy requests
      await axios.get("/request/outgoing").then(res => {
        console.log('SENT BUDDY REQUEST', res.data);
        dispatch(fetchSentBuddyRequests(res.data));
      }).catch((err) => {
        console.log(err);
      });

    } catch (error) {
      console.error(error);
    }
  };


  function onAccept(id) {
    console.log('Accept', id);
    axios.post('/request/incoming/accept', { r_id: id, b_id: props.otherID })
      //value={[incomingRequest.id, incomingRequest.from_user]}
      .then((response) => {
        transition(ACCEPTED);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onDecline(id) {
    console.log('Decline', id);

    axios.post('/request/incoming/reject', { r_id: id })
      .then((response) => {
        fetchData();
        alert("You have rejected the buddy request.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="notification-card">
      {mode === SHOW &&
        <>
          <h3>{props.fromUsername}</h3>
          <span>{props.request_message}</span>
          <button onClick={() => onAccept(props.id)}>Accept</button>
          <button onClick={() => onDecline(props.id)}>Decline</button>
        </>
      }
      {mode === ACCEPTED &&
        <>
          <h3>{props.fromUsername} IS NOW YOUR BUDDY</h3>
        </>
      }
      {mode === REJECTED &&
        <>
          <h3>Rejected a request from {props.fromUsername}</h3>
        </>
      }
    </div>
  );
}

