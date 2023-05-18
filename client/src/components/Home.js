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
import GoalManager from "./GoalManager";

export default function Home(props) {
  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.viewManager)  

  const user = useSelector(state => state.session.user);
  
  // When user selects a particular main goal, set it here
  const goalState = useSelector(state => state.mainGoal.value);
  const [currentGoal, setCurrentGoal] = useState(0);

  const startSession = function(user) {
    socket.auth = { user: user.id };
    socket.connect();
    socketBuddyFunctions(dispatch);

    axios.get(`/api/interests/${user.id}`).then(res => {
      const { categories, interests } = res.data;
      const interestsArray = categories.map(c => {
        return;
      });
      const interestsObject = {};
      categories.forEach(c => {
        interestsObject[c.id] = { category: c.id, name: c.name, isInterest: interests.includes(c.id) };
      });
      dispatch(setInterests(interestsObject));
    });

  };

  useEffect(() => {
    startSession(user);
    return () => { buddyFunctionsOff(); };
  }, []);


  useEffect(() => {
    axios.get('/mainGoals', { params: { userID: user.id, } }
    ).then(res => {
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
      {/* <Survey/> */}
      !goalState[currentGoal] ? <></> : <GoalManager currentGoal={goalState[currentGoal]}/>
      <RightSidebar />
    </main>
  );
}

