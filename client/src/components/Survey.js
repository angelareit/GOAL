import React from 'react';
import './Navbar.scss';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Survey(props) {

  const interests = useSelector(state => state.session.interests);
  const user = useSelector(state => state.session.user);

  const toggleInterest = function(id, user, checked) {
    console.log(id, checked);
    if (checked) {
      return axios.post(`/interest/`, { category: id, user }).then(res => {
        console.log(res.data);
      });
    }

    axios.delete(`/interest/`, { data: { category: id, user } }).then(res => {
      console.log(res.data);
    });
  };

  const renderedCategories = interests.map((c, i) => {
    return <span key={i}><input type="checkbox" defaultChecked={c.isInterest} onChange={(event) => { toggleInterest(c.category, user.id, event.target.checked); }} value={c.category} /><label htmlFor={c.name}>{c.name} </label></span>;
  });

  return (
    <form className="Survey" onSubmit={(event) => {
      event.preventDefault();
      // TODO: updateInterests();
    }}>
      <h1>Tell us about yourself!</h1>
      <p>What kinds of goals will you be working on? If you'd like an accountability buddy, this will helps others with similar goals find you. (Placeholder text, there will be more.)</p>
      {renderedCategories}
      <button type="submit">Update Interests</button>
    </form>
  );
}