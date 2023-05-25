import React, { useState, useEffect } from "react";
import axios from "axios";
import './Search.scss';

import { useDispatch, useSelector } from "react-redux";
import { showBuddyChatPanel } from "../../features/viewManagerSlice";
import { fetchPendingBuddyRequests, removePendingBuddyRequest } from "../../features/notificationSlice";
import { updateUser, setBuddy, fetchBuddyProgress } from "../../features/sessionSlice";
import socket from "../../helpers/socketsHelper";

const IncomingRequests = (props) => {

  const dispatch = useDispatch();

  // const [incomingRequests, setIncomingRequests] = useState([]);
  const [incomingResponse, setIncomingResponse] = useState("People are asking to be your buddy!");

  const incomingRequests = useSelector(state => state.notification.pendingBuddyRequests);
  // Fetch the incoming buddy requests from the server

  const handleAccept = (request) => {
    const requestID = request.id;
    const buddyID = request.from_user;
    dispatch(removePendingBuddyRequest(requestID));

    axios.post('/request/incoming/accept', { r_id: requestID, b_id: buddyID })
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
        axios.get('/progress', { params: { userID: buddyID } }
        ).then(res => {
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

  };

  const handleReject = (evt) => {
    const id = evt.target[0].value;
    dispatch(removePendingBuddyRequest(id));

    evt.preventDefault();
    axios.post('/request/incoming/reject', { r_id: id })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span className="search-list">
      {incomingRequests?.length !== 0 && (
        <>
          <h3>{incomingResponse}</h3>
          {incomingResponse === 'People are asking to be your buddy!' ? (
            <>
              {incomingRequests.map((incomingRequest) => (
                <div key={incomingRequest.id} className='request-card'>
                  <h4>Buddy Invitation</h4>
                  <h3>{incomingRequest.users_buddy_requests_from_userTousers.username}</h3>
                  {incomingRequest.message && <span>{incomingRequest.message}</span>}

                  <button className='btn' onClick={event => {
                    handleAccept(incomingRequest);
                  }}>Accept</button>
                  <form onSubmit={handleReject}>
                    <input
                      value={incomingRequest.id}
                      type="hidden"
                    />
                    <button className='btn red'>Reject</button>

                  </form>
                </div>
              ))}
            </>
          ) : (<></>
          )}
        </>


      )}

    </span>
  );
};

export default IncomingRequests;
