import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './Landing.scss';
import { setUser, setInterests, fetchBuddyProgress } from '../../features/sessionSlice';
import { fetchPendingBuddyRequests, fetchSentBuddyRequests } from '../../features/notificationSlice';
import { setGoals } from '../../features/mainGoalSlice';
import { switchPage } from '../../features/viewManagerSlice';

import Login from './Login';
import Register from './Register';
import Splash from './Splash';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function Landing() {
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

    // Fetch pending buddy requests
    axios.get("/request/incoming").then(res => {
      console.log('PENDING BUDDY REQUEST', res.data);
      dispatch(fetchPendingBuddyRequests(res.data));
    }).catch((err) => {
      console.log(err);
    });

    // Fetch outgoing buddy requests
    axios.get("/request/outgoing").then(res => {
      console.log('SENT BUDDY REQUEST', res.data);
      dispatch(fetchSentBuddyRequests(res.data));
    }).catch((err) => {
      console.log(err);
    });

    //Fetch buddy progress
    axios.get('/progress', { params: { userID: user.buddy_id } }
    ).then(res => {
      console.log('progress', res.data);
      if (res.data.success) {
        dispatch(fetchBuddyProgress(res.data));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className='content'>
          {content === 'Login' ? <Login onLogin={onLogin} /> : <Register />}
        </div>
        <div className='tabs'>
          {content === 'Register' &&
            <div className='tab-content'>
              Already a user?
              <h3 className={`tab-header ${content === 'Login' && 'active'}`} onClick={() => setContent('Login')}>Login</h3>
            </div>
          }
          {content === 'Login' &&
            <div className='tab-content'>
              Dont have an account?
              <h3 className={`tab-header ${content === 'Register' && 'active'}`} onClick={() => setContent('Register')}>Sign up</h3>
            </div>
          }

        </div>
      </div>

    </div>
  );
}