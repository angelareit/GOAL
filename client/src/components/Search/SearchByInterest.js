import React, { useState, useEffect } from "react";
import axios from 'axios'



const SearchByInterest = () => {
  const [interestMatches, setInterestMatches] = useState([])
  const fetchInterestMatches = async () =>{
    try {
      const response = await axios.get("/search/interest");
      console.log("Search By Interest", response.data);
      setInterestMatches(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    fetchInterestMatches();
  }, []);

  return(
    <div className=''>
    <h5>These users share your interest. Connect with them and motivate eachother</h5>
    {interestMatches.map((interestMatch)=>(
   
      <li key={interestMatch.id}>
        {   console.log(interestMatch)}
      <div>{interestMatch.username}</div>
      <div>{interestMatch.interest.map(item => {
        return (<div>
          {console.log(item.name)}
          {item.name}</div>)
      })}</div>
      </li>
    )

    )}
  </div>
  )
}

export default SearchByInterest;