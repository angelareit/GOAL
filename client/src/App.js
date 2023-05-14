import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.scss"

import Chat from './components/Chat';
import Navbar2 from './components/Navbar2';
import Landing from './components/Landing';
import Home from './components/Home';

export default function App (props) {
  return (
    <div className="App">
      {/* insert conditional for authentication. If Not logged in, show landing page. else show home. */}
      {/*  <Landing/> */}
      <Navbar2/>
      <Home/>
    </div>
  );
}

