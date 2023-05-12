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

  const [user, setUser] = useState(`user${Math.round(Math.random() * 1000)}`);
  const [messages, setMessages] = useState([]);
  const [buddy, setBuddy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(user);
    socket.auth = { user, buddy: "buddyName" };
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
    socket.emit('MESSAGE_SEND', {user, message});
    const outgoingMessage = { user, message };
    console.log(outgoingMessage);
    setMessages(prev => [...prev, outgoingMessage]);
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
      <section>
        {renderedMessages}
      </section>
      <form className="input-message">
        <textarea name="message" onChange={event => setMessage(event.target.value)} placeholder="Enter message here..."></textarea>
        <button onClick={event => {
          event.preventDefault();
          sendMessage(message);
        }}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
