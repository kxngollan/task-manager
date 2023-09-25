import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="signin" onSubmit={handleSubmit}>
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
      <button className="signinbutton" type="submit">
        Login
      </button>
      <button className="signinbutton">
        <Link to="/register">Don't have an account</Link>
      </button>
    </form>
  );
};

export default LoginForm;
