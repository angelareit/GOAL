import "./Home.scss";

import React from 'react';
import { useSelector } from "react-redux";

import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import GoalManager from "./GoalManager";
import CreateGoalPrompt from "./CreateGoalPrompt";

export default function Home() {
  const activeGoal = useSelector(state => state.mainGoal.active);

  return (
    <main className="Home">
      <LeftSidebar />
     {/*  {activeGoal ? <h3>HERE  </h3>: <CreateGoalPrompt />} */}
      {activeGoal ? <GoalManager /> : <CreateGoalPrompt />}

      <RightSidebar />
    </main>
  );
}

