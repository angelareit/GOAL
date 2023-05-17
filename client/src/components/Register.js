import { useState } from "react";
import axios from "axios";

function Register() {
  const [registration, setRegistration] = useState({
    userName: "",
    email: "",
    interest: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRegistration((prevRegistration) => ({
      ...prevRegistration,
      [id]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    axios.post(
      '/register', registration
    )
    .then(res => {
      setRegistration(
        {userName: "",
        email: "",
        interest: "",
        password: "",}    
      )
    })
  };

  return (
    <form className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" htmlFor="userName">
            User Name
          </label>
          <input
            className="form__input"
            type="text"
            value={registration.userName}
            onChange={(e) => handleInputChange(e)}
            id="userName"
            placeholder="User Name"
            required
          />
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={registration.email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
            required
          />
        </div>
        <div className="interest">
          <label className="form__label" htmlFor="interest">
            Interest
          </label>
          <input
            type="text"
            id="interest"
            value={registration.interest}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="Interest"
          />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={registration.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
            required
            minLength="6"
          />
        </div>
      </div>
      <div className="footer">
        <button onClick={handleSubmit} type="submit" className="btn">
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
