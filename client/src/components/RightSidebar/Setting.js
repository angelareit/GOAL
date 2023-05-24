import './RightSidebar.scss';
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setBuddy, updateInterest } from '../../features/sessionSlice';
import axios from 'axios';

/**id:null
name: null
online:null */
const Setting = () => {

  const buddyState = useSelector(state => state.session.buddy);
  const userState = useSelector((state) => state.session.user);
  const interests = useSelector(state => state.session.interests);
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

  // const toggleInterestOld = (index) => {
  //   axios.post('/setting/interest', { interest_id: evt })
  //     .then(response => {
  //       if (response.data.status === 'added') {
  //         console.log("print out added");
  //         setData(prev => [...prev, evt]);
  //       } else {
  //         console.log("print out deleted");
  //         setData(prev => prev.filter(i => i !== evt));
  //       }
  //       console.log(response);
  //     });

  // };

  const toggleInterest = function(id, user, checked) {
    dispatch(updateInterest({ id, checked }));
    if (checked) {
      return axios.post(`/interest/`, { category: id, user }).then(res => {
        console.log(res.data);
      });
    }

    axios.delete(`/interest/`, { data: { category: id, user } }).then(res => {
      console.log(res.data);
    });
  };

  // useEffect(() => {

  // axios.get('/setting/interest')
  //   .then(response => {
  //     setData(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, []);


  const renderedInterests = Object.values(interests).map((c, i) => {
    return (
      <button
        key={i}
        className={`btn ${c.isInterest ? 'active' : 'inactive'}`}
        type='submit'
        onClick={() => toggleInterest(c.category, userState.id, !c.isInterest)}>
        {c.name}
      </button>
    );
  });

  return (
    <div className="Settings">
      <h2>SETTINGS</h2>
      {
        isAvailable ? (
          <div>
            <p>You are available as an accountability buddy.</p>
            <button className="btn off" onClick={availabilityOff}>Turn off availability</button>
          </div>
        ) : (
          <div>
            <p>You are not available as an accountability buddy.</p>
            <button className="btn on" onClick={availabilityOn}>Turn on availability</button>
          </div>
        )
      }
      <h5>Update your interests to find more compatible accountability buddies! </h5>
      <div className="interests">
        {renderedInterests}
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

    </div>
  );
};

export default Setting;
