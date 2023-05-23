import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setBuddy } from '../features/sessionSlice';
import axios from 'axios';

/**id:null
name: null
online:null */
const Setting = () => {

  const buddyState = useSelector(state => state.session.buddy);
  const userState = useSelector((state) => state.session.user);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const [isAvailable, setIsAvailable] = useState(userState.buddy_availability);

  const removeBuddy = () => {
    axios.post('setting/remove_buddy', { b_id: buddyState.id })
      .then(
        res => {
          return dispatch(setBuddy({
            id: null,
            name: null,
            online: null
          }));
        }
      )
      .then(
        console.log('deleted buddyState', buddyState)
      );
    console.log(buddyState.id);
  };
  const availabilityOn = (evt) => {
    // evt.preventDefault();
    axios.post('/setting/availability', { avilability: true });
    setIsAvailable(true);
    // alert('Your are available as accountability buddy.')
  };

  const availabilityOff = (evt) => {
    // evt.preventDefault();
    axios.post('/setting/availability', { avilability: false });
    setIsAvailable(false);
    // alert('Your are no longer available as accountability buddy.')

  };
  const updateInterest = (evt) => {
    // evt.preventDefault();
    axios.post('/setting/interest', { interest_id: evt })
      .then(response => {
        if (response.data.status === 'added') {
          console.log("print out added");
          setData(prev => [...prev, evt]);
        } else {
          console.log("print out deleted");
          setData(prev => prev.filter(i => i !== evt));
        }
        console.log(response);
      });

  };

  useEffect(() => {
    axios.get('/setting/interest')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <span>
      <h1>SETTINGS</h1>
      {
        isAvailable ? (
          <div>
            <p>You are available as an accountability buddy.</p>
            <button className="btn" onClick={availabilityOff}>Turn off availability</button>
          </div>
        ) : (
          <div>
            <p>You are not available as an accountability buddy.</p>
            <button className="btn" onClick={availabilityOn}>Turn on availability</button>
          </div>
        )
      }
      <div>
        <h5>Update your interest can help you find better accountability buddy! </h5>
        <button
          className={`btn ${data.includes(1) ? 'active' : 'inactive'}`}
          type='submit'
          onClick={() => updateInterest(1)}
        >
          Health & Fitness
        </button>
        <button
          className={`btn ${data.includes(2) ? 'active' : 'inactive'}`}
          type='submit'
          onClick={() => updateInterest(2)}>
          Job & Career
        </button>
        <button
          className={`btn ${data.includes(3) ? 'active' : 'inactive'}`}
          type='submit'
          onClick={() => updateInterest(3)}>
          Travel
        </button>
        <button
          className={`btn ${data.includes(4) ? 'active' : 'inactive'}`} type='submit'
          onClick={() => updateInterest(4)}>
          Arts
        </button>
        <button
          className={`btn ${data.includes(5) ? 'active' : 'inactive'}`} type='submit'
          onClick={() => updateInterest(5)}>
          Personal Project
        </button>
        <button
          className={`btn ${data.includes(6) ? 'active' : 'inactive'}`}
          type='submit'
          onClick={() => updateInterest(6)}>
          Education
        </button>
        <button className={`btn ${data.includes(7) ? 'active' : 'inactive'}`}
          type='submit'
          onClick={() => updateInterest(7)}>
          Social
        </button>
      </div>
      <div>
        {buddyState?.name ?
          (<div>
            <h5>Your accountability buddy is {buddyState.name}.</h5>
            <button className="btn" onClick={removeBuddy}>
              Remove Buddy
            </button>
          </div>)
          : (<></>)}
      </div>

    </span>
  );
};

export default Setting;
