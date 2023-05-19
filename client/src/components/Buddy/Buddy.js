import React, { useState } from 'react';
import buddyIcon from 'client/src/components/buddy_icon.jpg';

function Buddy (props) {  
  const [buddy] = props.buddy
  return (
    <>
    {buddy? <No_Buddy />:<Show_Buddy />}
    </>
)}
    export default Buddy
    // <span>
    //   <img src = {buddyIcon}/>
    //   {/* if no buddy*/}
    //   <div><p>You currently have no Accountability Buddy.</p> 
    //   <p>Match with a buddy and get motivated!</p></div>
    //   <button>Search for buddy</button>
  
    //     {/* if not available for pairing*/}
    //     <div><p>You are currently not available for pairing.</p> 
    //     </div>
    //     {/* Buddy Requests */}
    //     <div></div>
    // </span>)