import axios from 'axios';
import '../App.scss';

import Login from './Login';
import Register from './Register';

//enables axios to save cookie on the client
axios.defaults.withCredentials = true;

export default function Landing(props) {

  return (
    <div className="App">
      {props.user ? <h1>Logged in as {props.user.username}</h1> : <h1>Not logged in</h1>}
      <Register />
      <Login onLogin={props.onLogin} />
    </div>
  );
}