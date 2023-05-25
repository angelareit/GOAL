import React from 'react';
import './BuddyView.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { showBuddyChatPanel, showBuddyProgressPanel } from '../../../features/viewManagerSlice';

import Chat from './Chat';
import BuddyStatus from './BuddyStatus';
import Progress from './Progress';

function BuddyView() {
  const viewState = useSelector((state) => state.viewManager.rightSideBar);
  const newMessage = useSelector(state => state.messages.newMessage);
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
          className={`${viewState.currentTab === 'buddy-chat' ? 'active' : ''} ${newMessage ? 'message-alert' : ''}`}
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
      {viewState.currentTab !== 'buddy-chat' && viewState.currentTab !== 'buddy-progress' && <h2>You got a buddy!</h2>}
    </div>
  );
}

export default BuddyView;