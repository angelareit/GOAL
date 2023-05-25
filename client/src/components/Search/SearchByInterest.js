import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Search.scss';
import useVisualMode from "../../hooks/useVisualMode.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentBuddyRequests } from "../../features/notificationSlice";
import socket from "../../helpers/socketsHelper";



function SearchByInterest(props) {

  const [interestMatches, setInterestMatches] = useState([]);
  const interests = useSelector(state => state.session.interests);

  const fetchInterestMatches = function() {
    try {
      axios.get("/search/interest").then(res => {

        console.log("Search By Interest", res.data);
        setInterestMatches(res.data);
      });
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchInterestMatches();
  }, []);

  function onSendRequest(user, message) {
    axios.post('/search/request', { user: user, requestMessage: message })
      .then((res) => {
        console.log("Response:", res.data);
        const listOfMatches = [...interestMatches];
        const index = interestMatches.findIndex(u => user.id === u.id);
        listOfMatches.splice(index, 1);
        setInterestMatches(listOfMatches);
        socket.emit('OUTGOING_REQUEST', user.id);
      });
  }

  const interestMatchesRender = interestMatches.map((interestMatch, i) => {
    console.log("Item", interestMatch);
    return (<li key={i} className='request-card'>
      <h3>{interestMatch.username}</h3>
      <div className="interest-container">
        {interestMatch.interests.map((item, i) => {
          return (<p key={i} className='interest-name'>
            {/* {console.log(user.name)} */}
            {interests[item].name}
          </p>);
        })}
      </div>

      <button className='btn' onClick={() => onSendRequest(interestMatch, "Let's be goal buddies!")}>Send Request</button>
    </li>);
  });

  if (!interests) {
    return <h4>You don't have interests, Update your interest to receivecompatible buddy recommendations.</h4>;
  }
  if (interestMatches.length) {
    return (
      <div className='search-list'>
        <h4>Reccomended users based on Interests </h4>
        {interestMatchesRender}
      </div>
    );
  }

  return (<h4>No users with similar interests as yours are looking for an accountability buddy at this moment. Consider adding more interests in settings to get a wider selection.</h4>)
};

export default SearchByInterest;