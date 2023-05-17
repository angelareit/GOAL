import React from 'react';
import './Survey.scss';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { updateInterest } from '../features/sessionSlice';

export default function Survey(props) {

  const dispatch = useDispatch();

  const interests = useSelector(state => state.session.interests);
  const user = useSelector(state => state.session.user);

  const toggleInterest = function(id, user, checked) {
    console.log(interests);
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
    <div className="Survey">
      <h1>Tell us about yourself!</h1>
      <p>What kinds of goals will you be working on? If you'd like an accountability buddy, this will helps others with similar goals find you. (Placeholder text, there will be more.)</p>
      <section className="interest-container">{renderedCategories}</section>
      <button type="submit">Back</button>
    </div>
  );
}