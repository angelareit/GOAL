import React from "react";
import './Notifications.scss';

export default function InvitationCard(props) {

  return (
    <div className="notification-card">
      <h4>You sent a buddy invitation to</h4>
      <h3>{props.toUsername}</h3>
      <span>"{props.request_message}"</span>
    </div>
  );
}

