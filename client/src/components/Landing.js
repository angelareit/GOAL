import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.scss';

import Chat from './Chat';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function Landing(props) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios.get('/verify').then(res => {
      if (res.data.success) {
        setUser(res.data.user)
      }
    })
  }, [])
  
  const onLogin = (email, password) => {
    axios.post(
      '/login', { email, password }
    )
      .then(res => {
        console.log('response came back!');
        console.log(res)
        setUser(res.data.user)
      });
  };

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        setUser(undefined);
      }
    })
  }

  return (
    <div className="App">
      <Navbar username={user?.username} onLogout={onLogout} />
      {/* <Chat /> */}
      {user ? <h1>Logged in as {user.username}</h1> : <h1>Not logged in</h1>}
      <Register />
      <Login onLogin={onLogin} />
    </div>
  );
}

