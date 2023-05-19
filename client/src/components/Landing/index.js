import react, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './Landing.scss';
import { setUser } from '../../features/sessionSlice';
import { setGoals } from '../../features/mainGoalSlice';
import { switchPage } from '../../features/viewManagerSlice';


import Login from '../Login';
import Register from '../Register';
import Splash from './Splash';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function Landing(props) {
  const userState = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [content, setContent] = useState('Login');

  useEffect(() => {
    axios.get('/verify').then(res => {
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        dispatch(switchPage('Home'));
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
        dispatch(switchPage('Home'));
      });
  };

  return (
    <div className="Landing">
      <Splash />
      <div className='action-area'>
        <div className='tabs'>
          <h3 className={`tab-header ${content === 'Login' && 'active'}`} onClick={() => setContent('Login')}>Login</h3>
          <h3 className={`tab-header ${content === 'Register' && 'active'}`} onClick={() => setContent('Register')}>Sign up</h3>
        </div>
        <div className='content'>
        {content === 'Login' ? <Login onLogin={onLogin} /> : <Register />}
        </div>

      </div>

    </div>
  );
}