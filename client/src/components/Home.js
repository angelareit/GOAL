import "./Home.scss";

import socket, { socketBuddyFunctions, socketsDisconnect } from "../helpers/socketsHelper";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import GoalManager from "./GoalManager";
import CreateGoalPrompt from "./CreateGoalPrompt";

export default function Home() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user); 
  const activeGoal = useSelector(state => state.mainGoal.active);

  useEffect(() => {
    socket.auth = { user: user.id };
    
    socket.connect();

    socketBuddyFunctions(dispatch);

    return () => socketsDisconnect();
  }, []);

  return (
    <main className="Home">
      <LeftSidebar />
      {activeGoal ? <GoalManager /> : <CreateGoalPrompt />}
      <RightSidebar />
    </main>
  );
}

