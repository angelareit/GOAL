import React from 'react';
import './Notifications.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyChatPanel, showBuddyProgressPanel } from '../../../features/viewManagerSlice';


export default function Notifications(props) {
  const viewState = useSelector((state) => state.viewManager.rightSideBar);
  const dispatch = useDispatch();


  return (
    <div className="notifications">
      <div className='header'>
      <FontAwesomeIcon icon={regular("bell")} /> <h4> Notifications </h4>
      </div>
      <span>Buddy Requests</span>
    </div>
  );
}

