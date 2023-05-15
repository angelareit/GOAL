import React from 'react'
import './RightSidebar.scss'
import { useSelector, useDispatch } from 'react-redux'
import Chat from './Chat'

export default function RightSidebar(props) {
  const drawerState = useSelector((state) => state.rightSidebar.value)

  return (
    drawerState !== 'hidden' &&
    <section className='right-sidebar'>
      <h3>{drawerState}</h3>
      {drawerState === 'showing_buddy' && <Chat />}
    </section>
  )
}