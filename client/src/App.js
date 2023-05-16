import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyPanel } from './features/rightSidebarSlice';

import axios from 'axios';
import "./App.scss";

import RightSidebar from './components/RightSidebar';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';

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
  const dispatch = useDispatch();

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
        dispatch(showBuddyPanel());
        if (res.data.buddy) {
          setBuddy({ name: res.data.buddy.username, online: false });
        }
      }
    })
    .catch(err => {
      console.log(err);
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
        dispatch(showBuddyPanel());
        //Add this upon login
        if(res.data.buddy){
          setBuddy({ name: res.data.buddy.username, online: false });
          console.log(buddy);
        }
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
      {user ? <Home user={user} buddy={buddy} messageSend={messageSend} messages={messages} /> : <Landing onLogin={onLogin}/>}
    </div>
  );
}

export default App;