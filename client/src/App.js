import axios from 'axios';
import "./App.scss"
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import Survey from "./components/Survey";

import { resetViews, switchPage } from './features/viewManagerSlice';
import { resetGoals } from './features/mainGoalSlice';
import { resetSession } from './features/sessionSlice';
import { resetGoalManager } from './features/goalManagerSlice';
import socket from './helpers/socketsHelper';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function App() {

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.session.user);
  const viewState = useSelector((state) => state.viewManager.page);

  const onLogout = () => {
    axios.post('/logout').then(res => {
      if (res.data.success) {
        socket.disconnect();
        dispatch(resetSession());
        dispatch(resetGoals());
        dispatch(resetGoalManager());
        dispatch(resetViews());
      }
    });
  };

  return (
    <div className="App">
      <Navbar onLogout={onLogout} />
      {viewState === 'landing' && <Landing />}
      {viewState === 'survey' && <Survey />}
      {viewState === 'home' && <Home />}
    </div>
  );
};