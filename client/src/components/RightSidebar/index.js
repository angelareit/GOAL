import React from 'react';
import './RightSidebar.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuddyView from '../BuddyView';


export default function RightSidebar(props) {
  const drawerState = useSelector((state) => state.viewManager.rightSideBar)  
  const dispatch = useDispatch();

  return (
    drawerState.visibility &&
    <section className='RightSidebar'>
      {drawerState.currentView === 'buddy' && <BuddyView />}
      {drawerState.currentView === 'notifications' && <h2> NOTIFICATIONS </h2>}

    </section>
  );
}