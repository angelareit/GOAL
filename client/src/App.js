import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';

import Chat from './components/BuddyView/Chat';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
//enables axios to save cookie on the client
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState(null);
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
      });
  };

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        setUser(null);
      }
    });
  };

  return (
    <div className="App">
      <Navbar username={user?.username} onLogout={onLogout}/>
      <div className="main-container">
        <main>
          {user ? <h1>Logged in as {user.username}</h1> : <h1>Not logged in</h1>}
          <Login onLogin={onLogin} />
          <Register />
        </main>
        <section className="side-bar">
          <Sidebar user={user} />
        </section>
      </div>
    </div>
  );
}

export default App;
