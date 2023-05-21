import React, { useEffect } from 'react';
import './BuddyView.scss'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'



export default function Progress(props) {
  const userState = useSelector((state) => state.session.user)
  const dispatch = useDispatch();

  /*   useEffect(() => {
     
    }, []);
   */

  return (
    <div className="progress">
      <h3>PROGRESS</h3>
    </div>
  )
}