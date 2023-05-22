import React, {useState} from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';


const Setting = () => {

  const buddyState = useSelector(state => state.session.buddy);
  const userState = useSelector((state) => state.session.user);

  const availabilityOn = (evt) => {
    // evt.preventDefault();
    axios.post('/setting/availability', { avilability: true });
    alert('Your are available as accountability buddy.')
  };

  const availabilityOff = (evt) => {
    // evt.preventDefault();
    axios.post('/setting/availability', { avilability: false });
    alert('Your are no longer available as accountability buddy.')

  };
  
  const updateInterest = (evt) =>{
    // evt.preventDefault();
    axios.post('/setting/interest', { interest_id:evt});

  }

  return (
    <span>
      <h1>SETTING</h1>
    {
      userState.buddy_availability ? (
        <div>
        <p>You are available as an accountability buddy.</p>
        <button className="btn" onClick={availabilityOff}>Turn off availability</button>
        </div>
      ):(
        <div>
        <p>You are not available as an accountability buddy.</p>
        <button className="btn" onClick={availabilityOn}>Turn on availability</button>
        </div>
      )
    }
  <div>
    <h3>Update your interest and pair with accountability buddy!</h3>
    <button className="btn" type='submit' onClick={()=>updateInterest(1)}>Health & Fitness</button>
    <button className="btn" type='submit' onClick={()=>updateInterest(2)}>Job & Career</button>
    <button className="btn" type='submit' onClick={()=>updateInterest(3)}>Travel</button>
    <button className="btn" type='submit' onClick={()=>updateInterest(4)}>Arts</button>
    <button className="btn" type='submit' onClick={()=>updateInterest(5)}>Personal Project</button>
    <button className="btn" type='submit' onClick={()=>updateInterest(6)}>Education</button>
    <button className="btn" type='submit' onClick={()=>updateInterest(7)}>Social</button>
  </div>


    </span>
  );
};

export default Setting;
