import React, { useState, useEffect } from "react";
import './Notifications.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyChatPanel, showBuddyProgressPanel } from '../../../features/viewManagerSlice';
import { fetchBudddyRequests } from '../../../features/notificationSlice';


export default function PendingRequestList(props) {
  const dispatch = useDispatch();


   const buddyRequestList = props.list.map((request) => {
    console.log('buddy requests: ', request);
    return <>
    <h3> HJERE </h3>
    <h3>{request.request_message}</h3>
    </> 
  });

  return (
    <div className="">
      <span>HERE</span>
      {buddyRequestList}
    </div>
  );
}

