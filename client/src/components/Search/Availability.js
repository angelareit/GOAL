import React from "react";
import axios from "axios";

import '../RightSidebar/RightSidebar.scss'

import { useSelector, useDispatch } from "react-redux";

import { updateUser } from "../../features/sessionSlice";

export default function Avilability() {

  const dispatch = useDispatch();

  const isAvailable = useSelector(state => state.session.user.buddy_availability);

  const toggleAvailability = () => {
    axios.post('/setting/availability', { avilability: !isAvailable });
    dispatch(updateUser({ buddy_availability: !isAvailable }));
  };

  return (
    <div>
      <p>You are currently {!isAvailable && 'not '}available as an accountability buddy.</p>
      <button className={`btn ${isAvailable ? 'on' : 'off'}`} onClick={toggleAvailability}>Turn {isAvailable ? 'Off' : 'On'} Availability</button>
    </div>
  );
};

