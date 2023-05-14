import { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.scss"

import Chat from './Chat';

export default function Home (props) {
  return (
    <div className="">
    <Chat/>
    </div>
  );
}

