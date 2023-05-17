import React from 'react';
import './RightSidebar.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuddyView from '../BuddyView';

import { showBuddyPanel } from '../../features/rightSidebarSlice';

export default function RightSidebar(props) {
  const dispatch = useDispatch();

  // dispatch(showBuddyPanel());

  const drawerState = useSelector((state) => state.rightSidebar.value);

  return (
    drawerState !== 'hidden' &&
    <section className='RightSidebar'>
      {drawerState === 'showing_buddy' && <BuddyView />}
    </section>
  );
}