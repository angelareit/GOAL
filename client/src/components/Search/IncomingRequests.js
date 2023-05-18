import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomingRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [incomingResponse, setIncomingResponse] = useState("People are asking to be your buddy!");

  useEffect(() => {
    // Fetch the incoming buddy requests from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("/request/incoming");
        console.log(response.data);
        setIncomingRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAccept = (evt) => {
    evt.preventDefault();
    axios.post('/request/incoming/accept')
      .then((response) => {
        setIncomingResponse("Congratulations on you new buddy!");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleReject = (evt) => {
    evt.preventDefault();
    axios.post('/request/incoming/reject')
      .then((response) => {
        return () => { };
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span>
      <h2>{incomingResponse}</h2>
      {incomingResponse === 'People are asking to be your buddy!' ? (
        <>
          <p>Incoming Requests:</p>
          {incomingRequests.map((incomingRequest) => (
            <div key={incomingRequest.id}>
              <p>From User: {incomingRequest.users_buddy_requests_from_userTousers.username}</p>
              <p>{incomingRequest.message}</p>
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleReject}>Reject</button>
            </div>
          ))}
        </>
      ) : (<></>
      )}

    </span>
  );
};

export default IncomingRequests;
