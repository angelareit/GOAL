import React, { useState } from "react";
import axios from "axios";
import './Search.scss';
import BuddyRequestCard from "./BuddyRequestCard";
import { useSelector } from 'react-redux';

// const EDIT = "EDIT";
const SHOW = "SHOW";
const SENT = "SENT";
// const ERROR = "ERROR";

const SearchBar = () => {
  const userState = useSelector((state) => state.session.user);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  // const [successMessage, setSuccessMessage] = useState("")
  const notifications = useSelector((state) => state.notification.sentBuddyRequests);


  const onChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    axios.post('/search', { searchValue: searchValue, userID: userState.id })
      .then((res) => {
        console.log('SEARCH RESULT', res);
        setSearchValue("");
        if (res.data) {
          setSearchResults(res.data);
        }
      });
  };

  const searchResultList = searchResults === null ? null : searchResults.map((user) => {
    let request = notifications.find(obj => obj.to_user === user.id);
    return <BuddyRequestCard key={user.id} buddy={user} state={request ? SENT : SHOW} />;
  });


  return (
    <span className='search-list'>
      <form onSubmit={(evt) => onSubmit(evt)}>
        <input
          key="search-bar"
          value={searchValue}
          placeholder={"Find buddy by username"}
          onChange={(evt) => onChange(evt)}
        />
        <button className='btn'>Search</button>
      </form>
      {searchResults !== null && searchResults.length <= 0 ?
        <div className="no-matches">
          <h4>No Results Found</h4>User does not exist or is not available as buddy
        </div> : searchResultList}
    </span>
  );
};
export default SearchBar;
