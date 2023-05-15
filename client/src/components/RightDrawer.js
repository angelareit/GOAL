import React from 'react'
import './RightDrawer.scss'
import { useSelector, useDispatch } from 'react-redux'
import Chat from './Chat'

export default function RightDrawer(props) {
  const drawerState = useSelector((state) => state.rightDrawer.value)

  return (
    drawerState !== 'hidden' &&
    <section className='right-drawer'>
      <h3>{drawerState}</h3>
      {drawerState === 'showing_buddy' && <Chat />}
    </section>
  )
}