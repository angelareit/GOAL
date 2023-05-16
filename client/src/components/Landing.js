import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../App.scss';
import { setUser } from '../features/userSlice';
import Chat from './Chat';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function Landing() {
  const userState = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/verify').then(res => {
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        console.log('verify', userState);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const onLogin = (email, password) => {
    axios.post(
      '/login', { email, password }
    )
      .then(res => {
        dispatch(setUser(res.data.user));
        console.log('login', userState);
      });
  };

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        dispatch(setUser(undefined));
      }
    });
  };

  return (
    <div className="App">
      <Navbar username={userState?.username} onLogout={onLogout} />
      {/* <Chat /> */}
      {userState ? <h1>Logged in as {userState.username}</h1> : <h1>Not logged in</h1>}
      <Register />
      <Login onLogin={onLogin} />
    </div>
  );
}

