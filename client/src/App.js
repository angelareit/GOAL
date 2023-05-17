import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss"
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import { resetGoals } from './features/mainGoalSlice';

import { resetSession } from './features/sessionSlice';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function App() {

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        dispatch(resetSession());
        dispatch(resetGoals());
      }
    });
  };

  return (
    <div className="App">
      <Navbar username={userState?.username} onLogout={onLogout} />
      {userState ? <Home /> : <Landing />}
    </div>
  );
};