import React from 'react';
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { showBuddyPanel, showNotificationPanel } from '../features/rightSidebarSlice'
import { showGoalListPanel } from '../features/leftSidebarSlice'


export default function Navbar(props) {
  const dispatch = useDispatch()
  return (
    <nav className='nav'>
      <div>
      {props?.username && <button onClick={() => dispatch(showGoalListPanel())}>Goal List</button>}
        <h1>Project X</h1>
      </div>
      <div>
        {props?.username &&   
          <>
            <h2>{props.username}</h2>
            <button onClick={props.onLogout}>Log Out</button>
            <button onClick={() => dispatch(showBuddyPanel())}>Buddy</button>
            <button onClick={() => dispatch(showNotificationPanel())}>Notifications</button>
          </>
        }
      </div>
    </nav>
  );
}

/* import React from 'react';
import './Navbar.scss'

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
} */