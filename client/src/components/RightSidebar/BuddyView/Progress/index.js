import React from 'react';
import '../BuddyView.scss';
import { useSelector } from 'react-redux';
import ProgressCard from './progressCard';

export default function Progress() {
  const buddyProgressState = useSelector((state) => state.session.buddyProgress);

  let progressBars = <h3>Buddy currently has no goals.</h3>;
  if (buddyProgressState.goalCounts) {
    progressBars = buddyProgressState.goalCounts.map(mainGoal => {
      let value = (mainGoal.completed_count / mainGoal.total_count) * 100;
      return <ProgressCard key={mainGoal.main_goal_id} title={mainGoal.main_goal_title} barValue={value} barMax={100} recentHistory={buddyProgressState.subGoalHistory[mainGoal.main_goal_id]} />;
    });
  }


  return (
    <div className="progress">
      {progressBars}
    </div>
  );
}