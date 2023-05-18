import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const[searchValue, setSearchValue] = useState("")
  const[buddyName, setBuddyName] = useState({username:""})
  const[successMessage, setSuccessMessage] = useState("")
  
  const onChange = (evt) => {
    setSearchValue(evt.target.value);
  };
  
  const onSubmit = (evt) => {
    evt.preventDefault();
    axios.post('/search', { searchValue: searchValue })
    .then((res) => {
      setSearchValue("");
      if (res.data){
        setBuddyName(res.data)
      } else {
        setBuddyName({username:null})
      }
      
      console.log(res.data)
    })
  };

  const handleBuddyRequest = (evt) => {
    evt.preventDefault();
    axios.post('/search/request', {user:buddyName})
    .then((res) => {
      setBuddyName({username:""})
      setSuccessMessage("Friend request has been submitted.")
    })
  }
  
  return (
    <>
      <form onSubmit={(evt) => onSubmit(evt)}>
        <input
          key="search-bar"
          value={searchValue}
          placeholder={"Find buddy by username"}
          onChange={(evt) => onChange(evt)}
        />
        <button>Search</button>
      </form>

      {buddyName.username === "" ? (
        <></>
      ):  
      buddyName.username === null ? (
        <div>The user you are looking for does not exist or could not be added as buddy.</div>
      ) : (
        <form onSubmit={(evt) => handleBuddyRequest(evt)}>
          <p>{buddyName.username} is available as a buddy!</p>
        <input
          value={buddyName.username}
          type="hidden"
        />
        <button>Send Request</button>
        </form>
      )}

      <span>
        {successMessage}
      </span>
    </>
  );}
export default SearchBar;
