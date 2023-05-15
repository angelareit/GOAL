import React from 'react';
import './LeftSidebar.scss'
import { useSelector, useDispatch } from 'react-redux'


export default function LeftSidebar(props) {
  const drawerState = useSelector((state) => state.leftSidebar.value)

  return (
    drawerState !== 'hidden' &&
    <section className="left-sidebar">
      <h3>{drawerState}</h3>
    </section>
  )
}