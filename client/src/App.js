import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss"

import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

/// PUT INTO LANDING PAGE
import { io } from 'socket.io-client';

const socket = io({ autoConnect: false });

const Message = function(message, user) {
  this.message = message;
  this.user = user;
  this.time = Date.now();
};
///

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState(null);

  /// IMPLEMENT IN LANDING PAGE
  //Boolean value that states if the user's buddy is online, can be anything truthy or falsy
  const [buddy, setBuddy] = useState({ name: null, online: false });

  //A list of all messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //Sends user information to server
    socket.auth = { user };
    socket.connect();

    // socket.emit('RETRIEVE_MESSAGES', user)

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
  ///

  useEffect(() => {
    axios.get('/verify').then(res => {
      if (res.data.success) {
        setUser(res.data.user);
      }
    });
  }, []);

  const onLogin = (email, password) => {
    axios.post(
      '/login', { email, password }
    )
      .then(res => {
        console.log('response came back!');
        console.log(res);
        setUser(res.data.user);
        //Add this upon login
        setBuddy({ name: res.data.buddy.name, online: res.data.buddy.online});
      });
  };

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        setUser(null);
      }
    });
  };

  function messageSend(message) {
    const outgoingMessage = new Message(message, user.id);

    socket.emit('MESSAGE_SEND', outgoingMessage);

    setMessages(prev => [...prev, outgoingMessage]);
  }

  return (
    <div className="App">
      <Navbar username={user?.username} onLogout={onLogout} />
      <div className="main-container">
        <main>
          {user ? <h1>Logged in as {user.username}</h1> : <h1>Not logged in</h1>}
          <Login onLogin={onLogin} />
          <Register />
        </main>
        <Sidebar user={user} messageSend={messageSend} messages={messages} />
      </div>
    </div>
  );
}

