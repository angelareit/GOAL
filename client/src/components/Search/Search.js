import React from "react";
import { useSelector } from 'react-redux';

import Availability from './Availability';
import SearchBar from "./SearchBar";
import NoBuddy from "./NoBuddy";
import IncomingRequests from "./IncomingRequests";
import SearchByInterest from "./SearchByInterest";
export default function Search(props) {
  //see if the user has a buddy
  //if buddyState.id is trusy, do not render incoming requests
  //if buddyState.id is falsy, render incoming requests
  const buddyState = useSelector(state => state.session.buddy);
  const userState = useSelector((state) => state.session.user);

  return (

    buddyState.id ? (<></>) : (
      <span>
        <NoBuddy />
        {userState.buddy_availability ? (<>
          <SearchBar />
          <IncomingRequests />
          <SearchByInterest />
        </>) :
          (<Availability />)
        }
      </span>
    )
  );
}