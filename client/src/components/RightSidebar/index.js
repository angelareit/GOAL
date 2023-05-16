import React from 'react';
import './RightSidebar.scss';
import { useSelector, useDispatch } from 'react-redux';
import BuddyView from '../BuddyView';

export default function RightSidebar(props) {
  
  const drawerState = useSelector((state) => state.rightSidebar.value);

  return (
    drawerState !== 'hidden' &&
    <section className='RightSidebar'>
      {drawerState === 'showing_buddy' && <BuddyView {...props} />}
    </section>
  );
}