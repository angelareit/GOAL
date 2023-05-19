import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss"
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import { resetViews } from './features/viewManagerSlice';
import { resetGoals } from './features/mainGoalSlice';
import Survey from './components/Survey';

import { resetSession } from './features/sessionSlice';
import socket from './helpers/socketsHelper';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function App() {

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const viewState = useSelector((state) => state.viewManager.page)


  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        dispatch(resetSession());
        socket.disconnect();
        dispatch(resetGoals());
        dispatch(resetViews());
      }
    });
  };

  return (
    <div className="App">
      <Navbar username={userState?.username} onLogout={onLogout} />
      {viewState === 'Home' ? <Home /> : <Landing />}
    </div>
  );
};