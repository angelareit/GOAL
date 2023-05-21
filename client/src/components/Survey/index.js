import React, { useEffect, useState } from 'react';
import './Survey.scss';

import SurveyForm from './SurveyForm';

import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from '../../features/viewManagerSlice';

export default function Survey(props) {

  const dispatch = useDispatch();

  const interests = useSelector(state => state.session.interests);
  const [exitLabel, setExitLabel] = useState("Later");

  useEffect(() => {
    let newLabel = "Later";
    if(Object.values(interests).some(interest => interest.isInterest === true )){
      newLabel = "Return";
    }
    setExitLabel(newLabel);
  }, [interests]);

  return (
    <div className="Survey">
      <h1>Tell us about yourself!</h1>
      <p>What kinds of goals will you be working on? If you'd like an accountability buddy, this will helps others with similar goals find you. (Placeholder text, there will be more.)</p>
      <SurveyForm />
      <button type="submit" onClick={() => dispatch(switchPage('home'))}>{exitLabel}</button>
    </div>
  );
}