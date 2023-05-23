import React from 'react';
import './BuddyView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyChatPanel, showBuddyProgressPanel } from '../../../features/viewManagerSlice';

import Chat from './Chat';
import BuddyStatus from './BuddyStatus';
import Progress from './Progress';

function BuddyView(props) {
  const viewState = useSelector((state) => state.viewManager.rightSideBar);
  const dispatch = useDispatch();


  return (
    <div className="BuddyView">
      <BuddyStatus />
      <div className='tabs'>
        <FontAwesomeIcon
          className={`${viewState.currentTab === 'buddy-progress' ? 'active' : ''}`}
          onClick={() => dispatch(showBuddyProgressPanel())}
          icon={solid("bars-progress")} />
        <FontAwesomeIcon
          className={`${viewState.currentTab === 'buddy-chat' ? 'active' : ''}`}
          onClick={() => dispatch(showBuddyChatPanel())}
          icon={solid("comments")} />
      </div>
      {viewState.currentTab === 'buddy-chat' &&
        <>
          <Chat />
        </>}
      {viewState.currentTab === 'buddy-progress' &&
        <>
          <Progress />
        </>}
    </div>
  );
}

export default BuddyView;