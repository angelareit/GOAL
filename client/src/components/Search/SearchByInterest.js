import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Search.scss';
import useVisualMode from "../../hooks/useVisualMode.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentBuddyRequests } from "../../features/notificationSlice";



function SearchByInterest(props) {

  const [interestMatches, setInterestMatches] = useState([]);
  const fetchInterestMatches = async () => {
    try {
      const response = await axios.get("/search/interest");
      console.log("Search By Interest", response.data);
      setInterestMatches(response.data);
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
    return (<li key={i} className='list-item'>
      <h4>{interestMatch.username}</h4>
      {interestMatch.interest.map((item, i) => {
        return (<p key={i} className='interest-name'>
          {console.log(item.name)}
          {item.name}
        </p>)
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