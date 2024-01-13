import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import fetchURL from '../../util/fetchURL';
import { CircularProgress } from '@mui/material';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${fetchURL}/signin/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();

      const token = data.token;
      console.log(token);

      localStorage.setItem('token', token);

      setLoading(false);
      return redirect('/todolist');
    } catch (error) {
      setLoading(false);
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
      {loading ? (
        <CircularProgress style={{ margin: '0 auto' }} />
      ) : (
        <>
          <button className="signinbutton" type="submit">
            Login
          </button>
          <Link to="/register">
            <button className="signinbutton">Don't have an account</button>
          </Link>
        </>
      )}
    </form>
  );
};

export default LoginForm;
