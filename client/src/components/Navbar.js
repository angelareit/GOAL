import React from 'react';
import './Navbar.scss';
import { useDispatch } from 'react-redux';


export default function Navbar(props) {
  const dispatch = useDispatch();

  return (
    <nav className='nav'>
      <h1>Project X</h1>
      <span>
        <h2>{props?.username && props.username}</h2>
        <button className='log_out' onClick={props.onLogout}>Log Out</button>
      </span>
    </nav>
  );
}