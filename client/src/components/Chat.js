import './Chat.scss';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const Message = function(message, user) {
  this.message = message;
  this.user = user;
  this.time = Date.now();
};

const socket = io({ autoConnect: false });

function Chat() {

  //Generates a random number for userID. TODO: Replace with actual userID from database
  const [user, setUser] = useState(`user${Math.round(Math.random() * 1000)}`);

  //A list of all messages
  const [messages, setMessages] = useState([]);

  //Boolean value that states if the user's buddy is online, can be anything truthy or falsy
  const [buddy, setBuddy] = useState(false);

  //This state is for the message currently being typed by the user
  const [message, setMessage] = useState('');

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

  function sendMessage(message) {
    if(!message){
      return;
    }
    socket.emit('MESSAGE_SEND', new Message(message, user));
    const outgoingMessage = { user, message };
    setMessages(prev => [...prev, outgoingMessage]);
    setMessage('');
  }

  const renderedMessages = messages.map((m, i) => {
    if (m.user === user) {
      return <blockquote key={i} className='message-outgoing'><b>You: </b>{m.message}</blockquote>;
    }
    return <blockquote key={i} className='message-incoming'><b>{m.user}: </b>{m.message}</blockquote>;
  });

  return (
    <div className="Chat">
      <section className="online-status">
        <p>{buddy ? "Your buddy is online" : "Your buddy is offline"}</p>
      </section>
      <section className="message-box">
        {renderedMessages}
      </section>
      <form className="input-message">
        <input type="text" name="message" value={message} onChange={event => setMessage(event.target.value)} placeholder="Enter message here..."></input>
        <button onClick={event => {
          event.preventDefault();
          sendMessage(message);
        }}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
