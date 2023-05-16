import './Chat.scss';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appendMessage } from '../../features/messagesSlice';

import socket from '../../helpers/socketsHelper';

function Chat() {
  
  const user = useSelector(state => state.user.value.id);
  const buddy = useSelector(state => state.buddy);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  //This state is for the message currently being typed by the user
  const [message, setMessage] = useState('');

  const submit = function(message) {
    if(!message){
      return;
    }
    const outgoingMessage = {
      content: message,
      sender_id: user,
      receiver_id: buddy.id,
    }
    const now = Date.now();
    dispatch(appendMessage({...outgoingMessage, created_at: now}));
    socket.emit('MESSAGE_SEND', {...outgoingMessage, created_at: new Date(now)});
    setMessage('');
  }

  const renderedMessages = messages.map((m, i) => {
    if (m.sender_id === user) {
      return <blockquote key={i} className='message message-outgoing'><b>You: </b><br/>{m.content}</blockquote>;
    }
    return <blockquote key={i} className='message message-incoming'><b>{buddy.name}: </b><br/>{m.content}</blockquote>;
  });

  return (
    <div className="Chat">
      <section className="message-box">
        {renderedMessages}
      </section>
      <form className="input-message">
        <textarea
          type="text"
          name="message" 
          value={message} 
          onChange={event => setMessage(event.target.value)}
          onKeyDown={event => {
            if(event.key === 'Enter'){
              if(event.shiftKey){
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
