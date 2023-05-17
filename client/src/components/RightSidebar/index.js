import React from 'react';
import './RightSidebar.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuddyView from '../BuddyView';

import { showBuddyPanel } from '../../features/rightSidebarSlice';

import { setBuddy } from '../../features/sessionSlice';
import { appendMessage, fetchMessageHistory, setMessages } from '../../features/messagesSlice';

import socket from '../../helpers/socketsHelper';

export default function RightSidebar(props) {
  const dispatch = useDispatch();
  
  dispatch(showBuddyPanel());

  const drawerState = useSelector((state) => state.rightSidebar.value);
  
  const userState = useSelector(state => state.session.user);
    
  useEffect(() => {
    //Sends user information to server
    socket.auth = { user: userState.id };
    socket.connect();

    socket.on('MESSAGE_RECEIVE', payload => {
      dispatch(appendMessage(payload));
    });

    socket.on('BUDDY_UPDATE', payload => {
      dispatch(setBuddy(payload));
    });

    socket.on('MESSAGE_HISTORY', payload => {
      dispatch(fetchMessageHistory(payload));
    });

    return () => {
      socket.disconnect();
      socket.off('MESSAGE_HISTORY');
      socket.off('BUDDY_UPDATE');
      socket.off('MESSAGE_RECEIVE');
    };
  }, []);

  return (
    drawerState !== 'hidden' &&
    <section className='RightSidebar'>
      {drawerState === 'showing_buddy' && <BuddyView />}
    </section>
  );
}