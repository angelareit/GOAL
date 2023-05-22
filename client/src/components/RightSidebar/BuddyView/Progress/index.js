import React, { useEffect } from 'react';
import '../BuddyView.scss'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { current } from 'immer';
import ProgressCard from './progressCard';



export default function Progress(props) {
  const buddyProgressState = useSelector((state) => state.session.buddyProgress)
  const dispatch = useDispatch();


  let progressBars = buddyProgressState.goalCounts.map(mainGoal => {
    let value = (mainGoal.completed_count / mainGoal.total_count) * 100;
    return <ProgressCard title={mainGoal.main_goal_title} barValue={value} barMax={100} recentHistory={buddyProgressState.subGoalHistory[mainGoal.main_goal_id]}/>
  });
  
  console.log('PROGRESS HERESS', typeof progressBars);
  return (
    <div className="progress">
      {Object.keys(progressBars ).length > 0 ? progressBars: <h3>Buddy currently has no goals.</h3>  }
    </div>
  )
}