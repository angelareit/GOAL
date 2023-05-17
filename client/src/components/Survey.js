import React from 'react';
import './Navbar.scss';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

export default function Survey(props) {

  const [categories, setCategories] = useState([]);
  const [interests, setInterests] = useState([]);

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    axios.get('/api/interests')
      .then(res => {
        setInterests(res.data.interests);
        setCategories(res.data.categories);
      });
  }, []);

  const toggleInterest = function() {
    
  };

  const updateInterests = function() {
  
  };

  const renderedCategories = categories.map((c, i) => {
    const found = interests.find(o => o.category_id === c.id) !== undefined;
    return <span key={i}><input type="checkbox" defaultChecked={found} onChange={() => { toggleInterest(c.id) }} value={c.id}/><label htmlFor={c.name}>{c.name} </label></span>
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