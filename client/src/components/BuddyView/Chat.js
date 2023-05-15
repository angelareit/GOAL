import './Chat.scss';

import { useState } from 'react';

function Chat(props) {
  
  const user = props.user;

  //This state is for the message currently being typed by the user
  const [message, setMessage] = useState('');

  function submit(message) {
    if(!message){
      return;
    }
    props.messageSend(message);
    setMessage('');
  }

  const renderedMessages = props.messages.map((m, i) => {
    if (m.user === user) {
      return <blockquote key={i} className='message message-outgoing'><b>You: </b>{m.message}</blockquote>;
    }
    return <blockquote key={i} className='message message-incoming'><b>{props.buddy}: </b>{m.message}</blockquote>;
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
