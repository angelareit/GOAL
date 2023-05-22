import React from "react";
import axios from "axios"
const Avilability = () =>{

  const handleAvailability = (evt) => {
    evt.preventDefault();
    axios.post('/setting/availability', {avilability:true})

  }

  return (
    <>
    <p>You are currently not available for pairing.</p>
    <button className = 'btn' onClick={handleAvailability}>Turn On Availability</button>
    </>
  )
}

export default Avilability;
