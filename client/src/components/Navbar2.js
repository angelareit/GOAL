import React from 'react';
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { showBuddyDrawer, showNotificationDrawer } from '../features/rightDrawerSlice'
import { showGoalListDrawer } from '../features/leftDrawerSlice'


export default function Navbar2(props) {
  const dispatch = useDispatch()
  return (
    <nav className='nav'>
      <div>
        <button onClick={() => dispatch(showGoalListDrawer())}>Goal List</button>
        <h1>Project X</h1>
      </div>
      <div>
        {props?.username &&
          <>
            <h2>{props.username}</h2>
            /* TODO: Change this to show notifications and buddy view buttons. Add the logout on a dropdown when username is clicked */
            <button onClick={props.onLogout}>Log Out</button>
          </>
        }
        {/*  Callbacks for right drawer */}
        <button onClick={() => dispatch(showBuddyDrawer())}>Buddy</button>
        <button onClick={() => dispatch(showNotificationDrawer())}>Notifications</button>
      </div>
    </nav>
  );
}