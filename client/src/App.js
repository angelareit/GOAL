import './App.scss';

import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io();


function App() {
  
  useEffect(() => {
    //https://socket.io/docs/v3/emit-cheatsheet/
    // socket.on('MESSAGE', payload =>  )
  
    return () => {
      //socket.off('MESSAGE');
    }
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
