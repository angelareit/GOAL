import React from 'react';
import './Navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useSelector, useDispatch } from 'react-redux'
import { showGoalListPanel, showBuddyPanel, showNotificationPanel } from '../features/viewManagerSlice';


export default function Navbar(props) {
  const dispatch = useDispatch()
  const viewState = useSelector((state) => state.viewManager)

  return (
    <nav className='nav'>
      <div>
        {props?.username &&
          <FontAwesomeIcon
          className={`iconbtn ${viewState.leftSideBar.currentView === 'goal_list' && viewState.leftSideBar.visibility ? 'active' : undefined}`}            onClick={() => dispatch(showGoalListPanel())}
            icon={icon({ name: "bars-staggered" })}
          />
        }
        <h1>Project X</h1>
      </div>
      <div>
        {props?.username &&
          <>
            <div className='dropdown'>
              <div className='dropbtn'>
                <h3>{props.username}</h3>
                <FontAwesomeIcon icon={solid("caret-down")} />
              </div>
              <div className="dropdown-content">
                <button onClick={() => { }}>Account Settings</button>
                <button onClick={props.onLogout}>Log Out</button>
              </div>
            </div>
            <FontAwesomeIcon
              className={`iconbtn-circle ${viewState.rightSideBar.currentView === 'buddy' && viewState.rightSideBar.visibility ? 'active' : undefined}`}
              onClick={() => dispatch(showBuddyPanel())}
              icon={solid("user-group")} />
            <FontAwesomeIcon
              className={`iconbtn-circle ${viewState.rightSideBar.currentView === 'notifications' && viewState.rightSideBar.visibility ? 'active' : undefined}`}
              onClick={() => dispatch(showNotificationPanel())}
              icon={solid("bell")} />

          </>
        }
      </div>
    </nav>
  );
}
