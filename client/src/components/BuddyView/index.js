import React from 'react';
import Chat from './Chat'

const BuddyView = (props) =>{
  return (
    props.user && <Chat {...props} />
  )
}

export default BuddyView;