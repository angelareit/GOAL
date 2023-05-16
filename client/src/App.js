import { useSelector } from 'react-redux';

import axios from 'axios';
import "./App.scss";

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

function App() {

  const userState = useSelector((state) => state.user.value);

  return (
    <div className="App">
      {/* <Navbar username={userState?.username} onLogout={onLogout} /> */}
      {userState ? <Home /> : <Landing />}
    </div>
  );
}

export default App;