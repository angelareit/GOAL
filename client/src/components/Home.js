import "./Home.scss";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';

import socket, { socketBuddyFunctions, buddyFunctionsOff } from "../helpers/socketsHelper";
import axios from "axios";

import { setInterests } from "../features/sessionSlice";
import Survey from "./Survey";

export default function Home(props) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const startSession = function(user) {
    socket.auth = { user: user.id };
    socket.connect();
    socketBuddyFunctions(dispatch);

    axios.get(`/api/interests/${user.id}`).then(res => {
      const { categories, interests } = res.data;
      const interestsArray = categories.map(c => {
        return { category: c.id, name: c.name, isInterest: interests.includes(c.id) };
      });
      dispatch(setInterests(interestsArray));
    });

  };

  useEffect(() => {
    startSession(user);
    return () => { buddyFunctionsOff(); };
  }, []);

  return (
    <main className="Home">
      <LeftSidebar />
      <Survey/>
      {/* <div className="goal-manager"><h3> GOAL TREE</h3></div> */}
      <RightSidebar />
    </main>
  );
}

