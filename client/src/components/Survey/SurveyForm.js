import React from 'react';
import './Survey.scss';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { updateInterest } from '../../features/sessionSlice';

export default function Survey() {

  const dispatch = useDispatch();

  const interests = useSelector(state => state.session.interests);
  const user = useSelector(state => state.session.user);

  const toggleInterest = function(id, user, checked) {
    dispatch(updateInterest({ id, checked}));
    if (checked) {
      return axios.post(`/interest/`, { category: id, user }).then(res => {
        console.log(res.data);
      });
    }
  
    axios.delete(`/interest/`, { data: { category: id, user } }).then(res => {
      console.log(res.data);
    });
  };

  const interestKeys = Object.keys(interests);
  const renderedCategories = interestKeys.map((k, i) => {
    const c = interests[k];
    return <span key={i} className="interest-box"><input type="checkbox" defaultChecked={c.isInterest} onChange={(event) => { toggleInterest(c.category, user.id, event.target.checked); }} value={c.category} /><label htmlFor={c.name}>{c.name} </label></span>;
  });

  return (
    <div className="SurveyForm">
      <section className="interest-container">{renderedCategories}</section>
    </div>
  );
}