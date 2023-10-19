import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import fetchURL from '../fetchURL';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const data = await response.json();

      const user = data.user;

      console.log('Data from response is:', user);

      cookies.set('TOKEN', user, {
        path: '/',
      });
      setLogin(true);

      window.location.href = '/todolist';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="signin" onSubmit={handleSubmit} id="login-form">
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
      <Link to="/demo">
        <button className="signinbutton">Try our Demo!</button>
      </Link>
    </form>
  );
};

export default LoginForm;
