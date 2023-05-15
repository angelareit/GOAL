import React from 'react';
import './LeftDrawer.scss'
import { useSelector, useDispatch } from 'react-redux'


export default function LeftDrawer(props) {
  const drawerState = useSelector((state) => state.leftDrawer.value)

  return (
    drawerState !== 'hidden' &&
    <section className="left-drawer">
      <h3>{drawerState}</h3>
    </section>
  )
}