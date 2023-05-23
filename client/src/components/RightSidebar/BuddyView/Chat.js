import './Chat.scss';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessage, deleteMessage, messageRead } from '../../../features/messagesSlice';

import MessageBubble from './MessageBubble';

import socket from '../../../helpers/socketsHelper';

function Chat() {

  const user = useSelector(state => state.session.user.id);
  const buddy = useSelector(state => state.session.buddy);
  const messages = useSelector(state => state.messages.list);
  const dispatch = useDispatch();

  //This state is for the message currently being typed by the user
  const [message, setMessage] = useState('');

  const messageBox = useRef(null);

  const scrollToBottom = function(instant) {
    if(instant) {
      return messageBox.current?.scrollIntoView({ behavior: 'instant' });
    }
    messageBox.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = function(message) {
    if (!message) {
      return;
    }
    const outgoingMessage = {
      content: message,
      sender_id: user,
      receiver_id: buddy.id,
    };
    const now = Date.now();
    dispatch(appendMessage({message: { ...outgoingMessage, created_at: Date(now) }, newMessage: false}));
    socket.emit('MESSAGE_SEND', { ...outgoingMessage, created_at: new Date(now) });
    setMessage('');
  };
  
  useEffect(() => {
    scrollToBottom();
    dispatch(messageRead());
  }, [messages]);

  useEffect(() => {
    scrollToBottom(true);
    dispatch(messageRead());
  }, []);

  const renderedMessages = messages.map((m, i) => {
    const messageType = m.sender_id === user ? 'outgoing' : 'incoming';
    return <MessageBubble message={m} buddy={buddy} type={messageType} deleteMessage={() => {
      socket.emit('MESSAGE_DELETE', { ...m });
      dispatch(deleteMessage(m));
    }} />;
  });

  return (
    <div className="Chat">
      <section className="message-box">
        {renderedMessages}
        <div className="end-of-messages" ref={messageBox} />
      </section>
      <form className="input-message">
        <textarea
          type="text"
          name="message"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              if (event.shiftKey) {
                return;
              }
              event.preventDefault();
              return submit(message);
            }
          }}
          placeholder="Enter message here..."></textarea>
        <button onClick={event => {
          event.preventDefault();
          submit(message);
        }}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
