import React, { useState, useEffect } from "react";
import './Notifications.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';



export default function RequestCard(props) {
  const buddyRequestList = notificationState.map((request) => {
    console.log('buddy requests: ', request);
    return <>
    <h3>{request.request_message}</h3>
    </> 
  });

  return (
    <div className="notifications">
      <div className='header'>
        <FontAwesomeIcon icon={regular("bell")} /> <h4> Notifications </h4>
      </div>
      <span>Buddy Requests</span>
      {buddyRequestList}
   </div>
  );

}

