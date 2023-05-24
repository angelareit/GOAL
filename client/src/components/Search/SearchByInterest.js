import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Search.scss';
import useVisualMode from "../../hooks/useVisualMode.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentBuddyRequests } from "../../features/notificationSlice";



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
      });
  }

  const interestMatchesRender = interestMatches.map((interestMatch, i) => {
    console.log("Item", interestMatch);
    return (<li key={i} className='request-card'>
      <h4>{interestMatch.username}</h4>
      {interestMatch.interests.map((item, i) => {
        return (<p key={i} className='interest-name'>
          {/* {console.log(user.name)} */}
          {interests[item].name}
        </p>);
      })}
      <button className='btn' onClick={() => onSendRequest(interestMatch, "I'd like to be compatibility buddies!")}>Send Request</button>
    </li>);
  });

  if (!interestMatches.length) {
    return <h4>You have not selected any interests. Update your interest to receivecompatible buddy recommendations.</h4>;
  }

  return (
    <div className='search-list'>
      <h4>These users share your interest. Connect with them and motivate each other</h4>
      {interestMatchesRender}
    </div>
  );
};

export default SearchByInterest;