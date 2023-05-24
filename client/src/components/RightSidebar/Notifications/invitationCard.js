import React, { useState, useEffect } from "react";
import './Notifications.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';



export default function InvitationCard(props) {

  return (
    <div className="notification-card">
      <span>Sent a buddy invitation to</span>
      <h3>{props.toUsername}</h3>
      <span>{props.request_message}</span>
    </div>
  );
}

