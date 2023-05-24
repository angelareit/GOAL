import React, { useState, useEffect } from "react";
import './Notifications.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyChatPanel, showBuddyProgressPanel } from '../../../features/viewManagerSlice';
import { fetchBudddyRequests } from '../../../features/notificationSlice';
import RequestCard from "./requestCard";
import InvitationCard from "./invitationCard";

const SHOW = "SHOW";
const REJECTED = "REJECTED";
const ACCEPTED = "ACCEPTED";
const ERROR = "ERROR";


export default function Notifications(props) {
  const notificationState = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const buddyState = useSelector((state) => state.session.buddy);



  let allBuddyRequests = notificationState.pendingBuddyRequests.concat(notificationState.sentBuddyRequests);
  allBuddyRequests.sort((a, b) => a.created_at - b.created_at);

  console.log('ALL BREQUESTS,',  allBuddyRequests);

  const buddyRequestList = allBuddyRequests.map((request) => {
    console.log('myID', userState.id , 'buddy requests: ', request);
   return ( request.to_user === userState.id ? <RequestCard  key={request.id} id={request.id} myID={request.to_user} otherID={request.from_user} fromUsername={request.users_buddy_requests_from_userTousers.username} request_message={request.request_message} state={buddyState.id ===request.from_user ? ACCEPTED:  SHOW}/> :
   <InvitationCard key={request.id} id={request.id} toUsername={request.users_buddy_requests_to_userTousers.username} request_message={request.request_message} />
  )
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

