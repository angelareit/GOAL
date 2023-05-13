import { useState } from 'react';
import axios from 'axios';
import './App.scss';

import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(undefined);

  const onLogin = (email, password) => {
    axios.post(
      '/login', {email, password}
    )
      .then(res => {
        console.log('response came back!');
      });
  };
  return (
    <div className="App">
      {/* <Chat /> */}
      <Register />
      <Login onLogin={onLogin} />
    </div>
  );
}

export default App;
