import React, { useState, useEffect } from "react";
import './Notifications.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyChatPanel, showBuddyProgressPanel } from '../../../features/viewManagerSlice';
import { fetchBudddyRequests } from '../../../features/notificationSlice';
import PendingRequestList from "./pendingRequestList";



export default function Notifications(props) {
  const notificationState = useSelector((state) => state.notification.buddyRequests);
  const dispatch = useDispatch();

  //const notificationState = [{ request_message: 'CONTENT' }, { request_message: 'CONTENT 2' },]
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

{/*       <PendingRequestList requestList={notificationState} />
 */}    </div>
  );
}
