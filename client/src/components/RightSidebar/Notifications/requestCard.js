import React from "react";
import './Notifications.scss';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { fetchPendingBuddyRequests, fetchSentBuddyRequests, removePendingBuddyRequest } from '../../../features/notificationSlice';
import { showBuddyChatPanel } from "../../../features/viewManagerSlice";
import { fetchBuddyProgress } from "../../../features/sessionSlice";
import useVisualMode from "../../../hooks/useVisualMode.js";
import socket from "../../../helpers/socketsHelper";

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
    dispatch(removePendingBuddyRequest(id));
    axios.post('/request/incoming/accept', { r_id: id, b_id: props.otherID })
      //value={[incomingRequest.id, incomingRequest.from_user]}
      .then((res) => {
        // dispatch(updateUser({ buddy_id: res.data.requestingUser.id }));
        // const buddy = res.data.requestingUser;
        dispatch(showBuddyChatPanel());
        // socket.emit('GET_BUDDY_INFO', payload => {
        //   dispatch(setBuddy(payload));

        // });
        socket.emit('ACCEPTED_BUDDY');
        // setIncomingResponse("Congratulations on your new buddy!");
        axios.get('/progress', { params: { userID: props.otherID } }
        )
          .then(res => {
            console.log('progress', res.data);
            if (res.data.success) {
              dispatch(fetchBuddyProgress(res.data));
            }
          }).catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  function onDecline(id) {
    console.log('Decline', id);
    dispatch(removePendingBuddyRequest(id));
    axios.post('/request/incoming/reject', { r_id: id })
      .then((response) => {
        fetchData();
        console.log('HERE NEW', response.data);
        alert("You have rejected the buddy request.", response);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onCancel(id) {
    console.log('Cancel', id);
    dispatch(removePendingBuddyRequest(id));
    axios.post('/request/incoming/reject', { r_id: id })
      .then((response) => {
        fetchData();
        alert("You have rejected the buddy request.");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className={`notification-card`}>
      {mode === SHOW &&
        <div className="col">
          <h4>You received a buddy invitation from</h4>
          <h3>{props.fromUsername}</h3>
          <span>"{props.request_message}"</span>
          <div className="action">
            <button onClick={() => onAccept(props.id)}>Accept</button>
            <button onClick={() => onDecline(props.id)}>Decline</button>
          </div>
        </div>
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

