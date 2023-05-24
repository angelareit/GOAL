import React, { useState, useEffect } from "react";
import axios from "axios";
import './Search.scss';

import { useDispatch } from "react-redux";

import { updateUser, setBuddy } from "../../features/sessionSlice";
import socket from "../../helpers/socketsHelper";

const IncomingRequests = () => {

  const dispatch = useDispatch();

  const [incomingRequests, setIncomingRequests] = useState([]);
  const [incomingResponse, setIncomingResponse] = useState("People are asking to be your buddy!");

  // Fetch the incoming buddy requests from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("/request/incoming");
      setIncomingRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    socket.on('UPDATE_REQUESTS', () => {
      fetchData();
    });
    return () => {socket.off('UPDATE_REQUESTS')};
  }, []);

  const handleAccept = (evt) => {
    evt.preventDefault();
    const r_id = parseInt(evt.target[0].value[0]);
    const b_id = parseInt(evt.target[0].value[2]);
    // console.log("raget", r_id, b_id)
    axios.post('/request/incoming/accept', { r_id: r_id, b_id: b_id })
      //value={[incomingRequest.id, incomingRequest.from_user]}
      .then((res) => {
        dispatch(updateUser({buddy_id: res.data.requestingUser.id}));
        // const buddy = res.data.requestingUser;
        socket.emit('GET_BUDDY_INFO', payload => {
          dispatch(setBuddy(payload));
        });
        // setIncomingResponse("Congratulations on your new buddy!");

      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleReject = (evt) => {
    evt.preventDefault();
    axios.post('/request/incoming/reject', { r_id: evt.target[0].value })
      .then((response) => {
        fetchData();
        alert("You have rejected the buddy request.");
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
              <p>Incoming Requests</p>
              {incomingRequests.map((incomingRequest) => (
                <div key={incomingRequest.id} className='list-item'>
                  <p>From User: {incomingRequest.users_buddy_requests_from_userTousers.username}</p>
                  <p>{incomingRequest.message}</p>
                  <form onSubmit={handleAccept}>
                    <input
                      value={[incomingRequest.id, incomingRequest.from_user]}
                      type="hidden"
                    />
                    <button className='btn'>Accept</button>
                  </form>
                  <form onSubmit={handleReject}>
                    <input
                      value={incomingRequest.id}
                      type="hidden"
                    />
                    <button className='btn'>Reject</button>

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
