import "./Home.scss";

import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import axios from "axios";

import React, { useEffect } from 'react';
import { setGoals } from '../features/mainGoalSlice';
import { useSelector, useDispatch } from 'react-redux'


export default function Home(props) {
  const userState = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/mainGoals', { params: { userID: userState.id, } }
    ).then(res => {

      console.log('TESTING', res.data);
      if (res.data.success) {
        dispatch(setGoals(res.data.result));
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <main className="Home">
      <LeftSidebar />
      <div className="goal-manager"><h3> GOAL TREE</h3></div>
      <RightSidebar />
    </main>
  );
}

