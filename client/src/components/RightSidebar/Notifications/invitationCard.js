import React from "react";
import './Notifications.scss';

export default function InvitationCard(props) {

  return (
    <div className="notification-card">
      <span>Sent a buddy invitation to</span>
      <h3>{props.toUsername}</h3>
      <span>{props.request_message}</span>
    </div>
  );
}

