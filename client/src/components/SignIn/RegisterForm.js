import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

const RegisterForm = (props) => {
  const [fName, setFName] = useState();
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const fNameChangeHandler = (event) => {
    setFName(event.target.value);
  };

  const lNameChangeHandler = (event) => {
    setLName(event.target.value);
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const password2ChangeHandler = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== password2) {
      return console.log("Password doesn't match");
    }
  };

  return (
    <form className="signin" onSubmit={handleSubmit}>
      <div className="signinform">
        <label htmlFor="fName">First name:</label>
        <input
          type="text"
          name="fName"
          placeholder="First Name"
          required
          onChange={fNameChangeHandler}
          value={fName}
        />
      </div>
      <div className="signinform">
        <label htmlFor="lName">Last Name:</label>
        <input
          type="text"
          name="lName"
          placeholder="Last Name"
          required
          onChange={lNameChangeHandler}
          value={lName}
        />
      </div>
      <div className="signinform">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          onChange={usernameChangeHandler}
          value={username}
        />
      </div>
      <div className="signinform">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          id="email"
          required
          onChange={emailChangeHandler}
          value={email}
        />
      </div>
      <div className="signinform">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          id="password"
          required
          onChange={passwordChangeHandler}
          value={password}
        />
      </div>
      <div className="signinform">
        <label htmlFor="password2">Re-enter Password:</label>
        <input
          type="password"
          name="password2"
          placeholder="password"
          id="password2"
          required
          onChange={password2ChangeHandler}
          value={password2}
        />
      </div>
      <button className="signinbutton" type="submit">
        Register
      </button>
      <button className="signinbutton">
        <Link to="/login">Already have an account</Link>
      </button>
    </form>
  );
};

export default RegisterForm;
