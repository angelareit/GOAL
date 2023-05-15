import React from 'react';
import BuddyView from '../BuddyView'

function Sidebar(props) {
  const buddy_id = (props.user && props.user.buddy_id) || null;
  return (
    buddy_id && <BuddyView {...props}/>
  )
}

export default Sidebar;