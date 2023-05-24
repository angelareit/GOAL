import React, { useEffect } from 'react';
import './RightSidebar.scss';
import { useSelector } from 'react-redux';

import BuddyView from './BuddyView';
import Search from '../Search/';
import Notifications from './Notifications';
import Setting from './Setting';

export default function RightSidebar(props) {
  const drawerState = useSelector((state) => state.viewManager.rightSideBar);
  return (
    drawerState.visibility &&
    <section className='RightSidebar'>
      {drawerState.currentView === 'notifications' && <Notifications />}
      {drawerState.currentView === 'settings' && <Setting />}
      {drawerState.currentView === 'search' && <Search />}
      {drawerState.currentView === 'buddy' && <BuddyView />}
    </section>
  );
}