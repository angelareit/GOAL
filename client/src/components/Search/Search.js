import React from "react";
import SearchBar from "./SearchBar";
import NoBuddy from "./NoBuddy";
import IncomingRequests from "./IncomingRequests";
export default function Search(props) {
  return (
    <span>
    <NoBuddy/>
    <SearchBar/>
    <IncomingRequests/>
    </span>
  );
}