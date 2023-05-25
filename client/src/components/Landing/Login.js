import React, { useState } from 'react';

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
    <form className="login form" onSubmit={onSubmit}>
      <div className="form-header">
        <h2> Welcome Back!</h2>
        <h3> Sign in</h3>
      </div>
      <div className='form-group'>
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
      </div>
      <div className='form-group'>
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
      </div>

      <footer>
        <button type="submit" className="btn">
          Login
        </button>
      </footer>
    </form>
  );
};

export default Login;