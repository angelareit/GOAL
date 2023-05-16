import React from 'react';
import './RightSidebar.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuddyView from '../BuddyView';

import { showBuddyPanel } from '../../features/rightSidebarSlice';

import { io } from 'socket.io-client';
import { setBuddy } from '../../features/buddySlice';

const socket = io({ autoConnect: false });

const Message = function(message, user) {
  this.message = message;
  this.user = user;
  this.time = Date.now();
};

export default function RightSidebar(props) {
  const dispatch = useDispatch();
  
  dispatch(showBuddyPanel());
  const drawerState = useSelector((state) => state.rightSidebar.value);
  
  const userState = useSelector(state => state.user.value);
  
  
  useEffect(() => {
    //Sends user information to server
    socket.auth = { user: userState.id };
    socket.connect();

    // socket.on('MESSAGE_RECEIVE', payload => {
    //   setMessages(prev => [...prev, payload]);
    // });

    socket.on('BUDDY_UPDATE', payload => {
      dispatch(setBuddy(payload));
    });

    return () => {
      socket.disconnect();
      socket.off('MESSAGE_RECEIVE');
      socket.off('BUDDY_UPDATE');
    };
  }, []);

  return (
    drawerState !== 'hidden' &&
    <section className='RightSidebar'>
      {drawerState === 'showing_buddy' && <BuddyView />}
    </section>
  );
}