import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../App.scss';
import { setUser } from '../features/sessionSlice';
import Login from './Login';
import Register from './Register';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function Landing(props) {
  const userState = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/verify').then(res => {
      if (res.data.success) {
        dispatch(setUser(res.data.user));
      }
    }).catch((err) => {
      console.log(err);
    });

    return () => { };

  }, []);

  const onLogin = (email, password) => {
    axios.post(
      '/login', { email, password }
    )
      .then(res => {
        dispatch(setUser(res.data.user));
      });
  };

  return (
    <div className="Landing">
      {userState ? <h1>Logged in as {userState.username}</h1> : <h1>Not logged in</h1>}
      <Register />
      <Login onLogin={onLogin} />
    </div>
  );
}