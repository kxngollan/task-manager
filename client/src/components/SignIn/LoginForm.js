import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import fetchURL from '../fetchURL';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const demoLogin = () => {
    setEmail('demo@demo.com');
    setPassword('Demo123');
    submission();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submission();
  };

  const submission = async () => {
    try {
      const response = await fetch(`${fetchURL}/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: { 'content-type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      setLogin(true);

      return navigate('/todolist');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="signin" onSubmit={handleSubmit} id="login-form">
      <div className="signinform">
        <h1>Your To Do List</h1>
        <h2>Login</h2>
      </div>
      <div className="signinform">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          id="email"
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
          onChange={passwordChangeHandler}
          value={password}
        />
      </div>
      <button className="signinbutton" type="submit">
        Login
      </button>
      {login ? (
        <p className="text-success">You Are Logged in Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Logged in</p>
      )}

      <Link to="/register">
        <button className="signinbutton">Don't have an account</button>
      </Link>

      <button className="signinbutton" onClick={demoLogin}>
        Try our Demo!
      </button>
    </form>
  );
};

export default LoginForm;
