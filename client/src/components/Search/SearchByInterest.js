import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Search.scss';

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

  return (
    <>
      {interestMatches.length === 0 ? (
        <h4>
        You are not interesting enough for a buddy. Update your interest to receive buddy recommendations.
        </h4>
      ) : (
        <div className='search-list'>
          <h4>These users share your interest. Connect with them and motivate each other</h4>
          {interestMatches.map((interestMatch) => (
            <li key={interestMatch.id} className='list-item'>
              <h4>{interestMatch.username}</h4>
              <div>
                {interestMatch.interest.map((item) => (
                  <div>
                    {console.log(item.name)}
                    {item.name}
                  </div>
                ))}
              </div>
              <button className='btn'>Send Request</button>
            </li>
          ))}
        </div>
      )}
    </>
  );
  
}

export default SearchByInterest;