import './App.css';

import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io();

useEffect(() => {
  //https://socket.io/docs/v3/emit-cheatsheet/
  // socket.on('MESSAGE', payload =>  )

  return () => {
    //socket.off('MESSAGE');
  }
}, []);


function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
