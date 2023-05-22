import React, { useEffect } from 'react';
import '../BuddyView.scss'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { current } from 'immer';



export default function ProgressCard(props) {

  const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;

  function getRelativeTime(timestamp) {
    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    });
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / DAY_MILLISECONDS,
    );

    return rtf.format(daysDifference, 'day');
  }

  function displayHistory() {
    let history;
    if (!props.recentHistory) {
      return <div className='subgoal-history-entry'><span>No Recent Activity</span> </div>; 
    }
    else {
    }

    history = props.recentHistory.map(subGoal => {
      return <div className='subgoal-history-entry'>
        <span>{subGoal.title}</span>
        <span>{getRelativeTime(new Date(subGoal.completed_on).getTime())}</span>
      </div>
    });
   return  history.slice(- 5);
  }


  return (
    <div className="progress-card">
      <span>{props.title}</span>
      <progress value={props.barValue} max={props.barMax}> {props.barValue} </progress>
      {displayHistory()}
    </div>
  )
}