import "./Home.scss";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setGoals } from '../features/mainGoalSlice';
import { switchPage } from '../features/viewManagerSlice';


import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import axios from "axios";
import socket, { socketBuddyFunctions, buddyFunctionsOff } from "../helpers/socketsHelper";


import { setInterests } from "../features/sessionSlice";
import Survey from "./Survey";
import Search from "./Search/Search";
import GoalManager from "./GoalManager";
import CreateGoalPrompt from "./CreateGoalPrompt";

export default function Home(props) {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.viewManager)  

  const activeGoal = useSelector(state => state.mainGoal.active);

  const user = useSelector(state => state.session.user);
  
  const startSession = function(user) {
    socket.auth = { user: user.id };
    socket.connect();
    socketBuddyFunctions(dispatch);

    //Fetch interests
    axios.get(`/api/interests/${user.id}`).then(res => {
      const { categories, interests } = res.data;
      const interestsObject = {};
      categories.forEach(c => {
        interestsObject[c.id] = { category: c.id, name: c.name, isInterest: interests.includes(c.id) };
      });
      dispatch(setInterests(interestsObject));
    });

    // Fetch main goals
    axios.get('/mainGoals', { params: { userID: user.id, } }
    ).then(res => {
      if (res.data.success) {
        dispatch(setGoals(res.data.result));
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    
    startSession(user);

    return () => { buddyFunctionsOff(); };
  }, []);

  return (
    <main className="Home">
      <LeftSidebar />
{/*       {activeGoal ? <h3>HERE  </h3>: <CreateGoalPrompt />}
      {activeGoal ? <GoalManager /> : <CreateGoalPrompt />}
 */}
      <RightSidebar />
    </main>
  );
}

