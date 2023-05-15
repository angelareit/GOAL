import React from 'react';
import './Sidebar.scss';
import BuddyView from '../BuddyView';

function Sidebar(props) {
  const buddy_id = (props.user && props.user.buddy_id) || null;
  return (
    <div className="Sidebar">
      {buddy_id && <BuddyView {...props} />}
    </div>
  );
}

export default Sidebar;