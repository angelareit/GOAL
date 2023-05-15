import React from 'react';
import Chat from './Chat';
import { useState, useEffect } from 'react';

import { io } from 'socket.io-client';

const socket = io({ autoConnect: false });

const Message = function(message, user) {
  this.message = message;
  this.user = user;
  this.time = Date.now();
};

function BuddyView(props) {

  const user = props.user;

  //A list of all messages
  const [messages, setMessages] = useState([]);

  //Boolean value that states if the user's buddy is online, can be anything truthy or falsy
  const [buddy, setBuddy] = useState(false);

  useEffect(() => {
    //Sends user information to server
    socket.auth = { user };
    socket.connect();

    socket.on('MESSAGE_RECEIVE', payload => {
      setMessages(prev => [...prev, payload]);
    });

    socket.on('BUDDY_ONLINE', payload => {
      setBuddy(payload);
    });

    return () => {
      socket.disconnect();
      socket.off('MESSAGE_RECEIVE');
      socket.off('BUDDY_ONLINE');
    };
  }, []);

  function messageSend(message) {


    if (!message) {
      return;
    }
    socket.emit('MESSAGE_SEND', new Message(message, user));
    const outgoingMessage = { user, message };
    setMessages(prev => [...prev, outgoingMessage]);
  }

  return (
    props.user && <Chat {...props} messageSend={messageSend} messages={messages} />
  );
}

export default BuddyView;