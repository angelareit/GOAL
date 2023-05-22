import react, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './Landing.scss';
import { setUser, setInterests, setBuddyProgress } from '../../features/sessionSlice';
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

  const initiateSession = function(user) {
    console.log("Initiate");
    if (!user) {
      return;
    }
    dispatch(setUser(user));
    
    //Fetch interests
    axios.get(`/api/interests/${user.id}`).then(res => {
      const { categories, interests } = res.data;
      const interestsObject = {};
      categories.forEach(c => {
        interestsObject[c.id] = { category: c.id, name: c.name, isInterest: interests.includes(c.id) };
      });
      dispatch(setInterests(interestsObject));
      if (!Object.values(interestsObject).some(interest => interest.isInterest === true)) {
        return dispatch(switchPage('survey'));
      }
      dispatch(switchPage('home'));
    });

    // Fetch main goals
    axios.get('/mainGoals', { params: { userID: user.id, } }
    ).then(res => {
      if (res.data.success) {
        dispatch(setGoals(res.data.result));
      }
    }).catch((err) => {
      console.log(err);
    });

    //Fetch buddy progress
    axios.get('/progress', { params: { userID: user.buddy_id } }
    ).then(res => {
      console.log('progress',res.data);
      if (res.data.success) {
        dispatch(setBuddyProgress(res.data));
      }
    }).catch((err) => {
      console.log(err);
    });


  };

  useEffect(() => {
    axios.get('/verify').then(res => {
      if (res.data.success) {
        initiateSession(res.data.user);
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
        initiateSession(res.data.user);
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