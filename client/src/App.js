import axios from 'axios';
import "./App.scss";
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import Survey from "./components/Survey";

import { resetViews } from './features/viewManagerSlice';
import { resetGoals } from './features/mainGoalSlice';
import { resetSession } from './features/sessionSlice';
import { resetGoalManager } from './features/goalManagerSlice';
import { resetNotifications } from './features/notificationSlice';

import socket from './helpers/socketsHelper';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function App() {

  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.viewManager.page);

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        socket.disconnect();
        dispatch(resetViews());
        dispatch(resetSession());
        dispatch(resetGoals());
        dispatch(resetGoalManager());
        dispatch(resetNotifications());
      }
    });
  };

  return (
    <div className="App">
      {viewState === 'landing' && <Landing />}
      {viewState !== 'landing' && <Navbar onLogout={onLogout} />}
      {viewState === 'survey' && <Survey />}
      {viewState === 'home' && <Home />}

    </div>
  );
};