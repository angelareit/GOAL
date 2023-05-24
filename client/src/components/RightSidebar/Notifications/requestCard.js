import React, { useState, useEffect } from "react";
import './Notifications.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';



export default function RequestCard(props) {

  function onAccept(id){
    console.log('Accept', id);
  }
  
  function onDecline (id){
    console.log('Decline', id);
  }

  return (
    <div className="notification-card">
      <h3>{props.fromUsername}</h3>
      <span>{props.request_message}</span>
      <button onClick={onAccept()}>Accept</button>
      <button onClick={onDecline()}>Decline</button>

    </div>
  );
}

