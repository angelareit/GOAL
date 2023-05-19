import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomingRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [incomingResponse, setIncomingResponse] = useState("People are asking to be your buddy!");
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = (evt) => {
    evt.preventDefault();
    const r_id = parseInt(evt.target[0].value[0])
    const b_id = parseInt(evt.target[0].value[2])
    // console.log("raget", r_id, b_id)
    axios.post('/request/incoming/accept',{r_id:r_id, b_id:b_id})
    //value={[incomingRequest.id, incomingRequest.from_user]}

      .then((response) => {
        setIncomingResponse("Congratulations on you new buddy!");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleReject = (evt) => {
    evt.preventDefault();
    axios.post('/request/incoming/reject',{r_id:evt.target[0].value})
      .then((response) => {
        fetchData()
        alert("You have rejected the buddy request.")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span>
      <h3>{incomingResponse}</h3>
      {incomingResponse === 'People are asking to be your buddy!' ? (
        <>
          <p>Incoming Requests</p>
          {incomingRequests.map((incomingRequest) => (
            <div key={incomingRequest.id}>
              <p>From User: {incomingRequest.users_buddy_requests_from_userTousers.username}</p>
              <p>{incomingRequest.message}</p>
              <form onSubmit={handleAccept}>
              <input
                  value={[incomingRequest.id, incomingRequest.from_user]}
                  type="hidden"
                />
                <button >Accept</button>
              </form>
              <form onSubmit={handleReject}>
                <input
                  value={incomingRequest.id}
                  type="hidden"
                />
                <button>Reject</button>

              </form>
            </div>
          ))}
        </>
      ) : (<></>
      )}

    </span>
  );
};

export default IncomingRequests;
