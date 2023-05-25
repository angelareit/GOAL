import './Chat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

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
    if (instant) {
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
    socket.emit('MESSAGE_SEND', { ...outgoingMessage, created_at: new Date(now) }, res => {
      dispatch(appendMessage({ message: { ...res }, newMessage: false }));
    });
    setMessage('');
  };

  useEffect(() => {
    scrollToBottom();
    dispatch(messageRead());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    scrollToBottom(true);
    dispatch(messageRead());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedMessages = messages.map((m, i) => {
    const messageType = m.sender_id === user ? 'outgoing' : 'incoming';
    return <MessageBubble key={i} message={m} buddy={buddy} type={messageType} deleteMessage={() => {
      console.log(m);
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

        <FontAwesomeIcon className='send-butt' icon={regular("paper-plane")} onClick={event => {
          event.preventDefault();
          submit(message);
        }} />
        {/*     <button onClick={event => {
          event.preventDefault();
          submit(message);
        }}>Send</button> */}
      </form>
    </div>
  );
}

export default Chat;
