import React, { useState, useNavigate } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Login = (props) => { 
  const [users, setUsers] = useState({
    email: "",
    password: ""
  });
  const onSubmit = (evt) => {
    evt.preventDefault();
    setUsers([users]);

    // const email = evt.target.email.value;
    // const password = evt.target.password.value;
    props.onLogin(users.email, users.password);
    //reset form value
    setUsers({
      email: "",
      password: ""
    });

  };
  return (
    <form onSubmit={onSubmit}>
      <label className="form__label" htmlFor="email">
        Email
      </label>
      <input
        name="email"
        type="email"
        value={users.email}
        onChange={(e) =>
          setUsers({ ...users, email: e.target.value })
        }
      />

      <label className="form__label" htmlFor="password">
        Password
      </label>
      <input
        name="password"
        type="password"
        value={users.password}
        onChange={(e) =>
          setUsers({ ...users, password: e.target.value })
        }
      />

      <div className="footer">
        <button type="submit" className="btn">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;