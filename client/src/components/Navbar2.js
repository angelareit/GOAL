import React from 'react';
import './Navbar.scss'

export default function Navbar2(props) {
  return (
    <nav className='nav'>
      <h1>Project X</h1>
      <span>
      { props?.username &&
        <>
          <h2>{props.username}</h2> 
          /* TODO: Change this to show notifications and buddy view buttons. Add the logout on a dropdown when username is clicked */
          <button onClick={props.onLogout}>Log Out</button>
        </>
      }
      </span>
    </nav>
  );
}