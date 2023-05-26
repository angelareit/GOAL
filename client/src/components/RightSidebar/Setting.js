import React from "react";
import './RightSidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Avilability from '../Search/Availability';
import { useSelector, useDispatch } from 'react-redux';
import { setBuddy, updateInterest, deleteBuddyProgress } from '../../features/sessionSlice';
import axios from 'axios';
import socket from '../../helpers/socketsHelper';

/**id:null
name: null
online:null */
const Setting = () => {

  const buddyState = useSelector(state => state.session.buddy);
  const userState = useSelector((state) => state.session.user);
  const interests = useSelector(state => state.session.interests);
  const dispatch = useDispatch();
  const removeBuddy = () => {
    axios.post('setting/remove_buddy', { b_id: buddyState.id })
      .then(
        res => {
          socket.emit('REMOVE_BUDDY', buddyState.id);
          dispatch(deleteBuddyProgress());
          return dispatch(setBuddy({
            id: null,
            name: null,
            online: null
          }));
        }
      );
  };

  const toggleInterest = function(id, user, checked) {
    dispatch(updateInterest({ id, checked }));
    if (checked) {
      return axios.post(`/interest/`, { category: id, user });
    }

    axios.delete(`/interest/`, { data: { category: id, user } });
  };

  const renderedInterests = Object.values(interests).map((c, i) => {
    return (
      <button
        key={i}
        className={`btn ${c.isInterest ? 'active' : 'inactive'}`}
        onClick={() => toggleInterest(c.category, userState.id, !c.isInterest)}>
        {c.name}
      </button>
    );
  });
  return (
    <div className="Settings">
      <div className='row-al-mid'> <FontAwesomeIcon size='2xl' icon={solid("gears")} /><h2>Account Settings</h2></div>
      <Avilability />
      <h5>Update your interests to find more compatible accountability buddies! </h5>
      <div className="interests">
        {renderedInterests}
      </div>
      {buddyState?.name && <div><h5>Your accountability buddy is {buddyState.name}.</h5>
          <button className="btn" onClick={removeBuddy}>
            Remove Buddy
          </button></div>}

    </div>
  );
};

export default Setting;
