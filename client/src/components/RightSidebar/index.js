import React from 'react';
import './RightSidebar.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import BuddyView from './BuddyView';
import Search from '../Search';
import Setting from '../Setting';


export default function RightSidebar(props) {
  const drawerState = useSelector((state) => state.viewManager.rightSideBar);

  return (
    drawerState.visibility &&
    <section className='RightSidebar'>
      {drawerState.currentView === 'notifications' && <h2> NOTIFICATIONS </h2>}
      {drawerState.currentView === 'settings' && <h2> <Setting /> </h2>}
      {drawerState.currentView === 'search' && <Search />}
      {drawerState.currentView === 'buddy' && <BuddyView />}
    </section>
  );
}