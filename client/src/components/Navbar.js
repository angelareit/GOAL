import React from 'react';
import './Navbar.scss'

const Navbar = (props) =>{
  return (
    <nav className='nav'>
      <h1>Project X</h1>
      <span>
      <h2>{props?.username && props.username}</h2>
      <button onClick={props.onLogout}>Log Out</button>
      </span>
    </nav>
  )
}

export default Navbar;