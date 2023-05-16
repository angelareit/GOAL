import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss"

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './features/userSlice';


import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';

export default function App(props) {
  const userState = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        dispatch(setUser(undefined));
      }
    });
  };
  
  return (
    <div className="App">
      {userState ? 
      <>
        <Navbar username={userState?.username} onLogout={onLogout} />
        <Home />
      </>
        : <Landing />}
    </div>
  );
}

