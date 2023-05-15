import React from 'react';
import BuddyView from '../BuddyView'
import BuddySearch from '../BuddySearch'

const Sidebar = (props) =>{
  const buddy_id = (props.user && props.user.buddy_id) || null;
  return (
    buddy_id ? <BuddyView {...props} /> : <BuddySearch />
  )
}

export default Sidebar;