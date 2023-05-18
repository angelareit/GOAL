import { useEffect, useNavigate } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../App.scss';
import { setUser } from '../features/sessionSlice';
import { setGoals } from '../features/mainGoalSlice';
import { switchPage } from '../features/viewManagerSlice';


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
        dispatch(switchPage('Home'));
        console.log('verified user', userState);
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
        console.log('verified user ON LOGIN', res.data.user, userState);
        //window.location.reload();

      });

      /* axios.get('/mainGoals').then(res => {
        console.log('TESTING MAIN GOALS', res.data);
        if (res.data.success)
        {
          dispatch(setGoals(res.data.result));
        }
      }).catch((err) => {
        console.log(err);
      }); */


  };

  return (
    <div className="Landing">
      {userState ? <h1>Logged in as {userState.username}</h1> : <h1>Not logged in</h1>}
      <Register />
      <Login onLogin={onLogin} />
    </div>
  );
}