import React from "react";
import { useSelector } from 'react-redux';

import SearchBar from "./SearchBar";
import NoBuddy from "./NoBuddy";
import IncomingRequests from "./IncomingRequests";
import SearchByInterest from "./SearchByInterest";
export default function Search(props) {
 //see if the user has a buddy
 //if buddyState.id is trusy, do not render incoming requests
 //if buddyState.id is falsy, render incoming requests
 const buddyState = useSelector(state => state.session.buddy);
console.log('This is buddystate', buddyState)

 return (
    buddyState.id ? (<></>):(
      <span>
      <NoBuddy/>
      <SearchBar/>
      <IncomingRequests/>
      <SearchByInterest/>
      </span>
    )
  );
}