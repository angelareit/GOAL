import React from 'react';

import './BuddyView.scss';

import Chat from './Chat';
import BuddyStatus from './BuddyStatus';

function BuddyView(props) {
  return (
    <div className="BuddyView">
      <h3>Productivity Buddy</h3>
      <BuddyStatus />
      {/* Buddy progress panel will go here. */}
      <Chat />
    </div>
  );
}

export default BuddyView;