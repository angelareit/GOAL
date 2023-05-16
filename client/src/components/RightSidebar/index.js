import React from 'react';
import './RightSidebar.scss';
import { useSelector, useDispatch } from 'react-redux';
import BuddyView from '../BuddyView';

import { io } from 'socket.io-client';

const socket = io({ autoConnect: false });

const Message = function(message, user) {
  this.message = message;
  this.user = user;
  this.time = Date.now();
};

export default function RightSidebar(props) {
  
  const drawerState = useSelector((state) => state.rightSidebar.value);

  return (
    drawerState !== 'hidden' &&
    <section className='RightSidebar'>
      {drawerState === 'showing_buddy' && <BuddyView {...props} />}
    </section>
  );
}