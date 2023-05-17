import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const[searchValue, setSearchValue] = useState("")
  const[buddyName, setBuddyName] = useState("")
  const[successMessage, setSuccessMessage] = useState("")
  
  const onChange = (evt) => {
    setSearchValue(evt.target.value);
  };
  
  const onSubmit = (evt) => {
    evt.preventDefault();
    axios.post('/search', { searchValue: searchValue })
    .then((res) => {
      console.log(res)
      setSearchValue("");
      if (res.data){
        setBuddyName(res.data['username'])
      } else {
        setBuddyName(null)
      }
      
      console.log(res.data)
    })
  };

  const handleBuddyRequest = (evt) => {
    evt.preventDefault();
    console.log("Thes es a mesge")
    axios.post('/search/request',{username:buddyName})
    .then((res) => {
      setBuddyName("")
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

      {buddyName === "" ? (
        <></>
      ):  
      buddyName === null ? (
        <div>The user you are looking for does not exist or could not be added as buddy.</div>
      ) : (
        <form onSubmit={(evt) => handleBuddyRequest(evt)}>
          <p>{buddyName} is available as a buddy!</p>
        <input
          value={buddyName}
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
