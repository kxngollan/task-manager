import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import fetchURL from '../../util/fetchURL';
import { CircularProgress } from '@mui/material';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibility, setvisibility] = useState('password');

  const redirect = useNavigate();

  const changeVis = () => {
    if (visibility === 'password') {
      setvisibility('text');
    } else {
      setvisibility('password');
    }
  };

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

      if (res.status === 401) {
        throw new Error('Invalid email or password');
      }

      if (res.status === 422) {
        throw new Error('Email not found');
      }

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
      setError(error.message);
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
          required
        />
      </div>
      <div className="signinform">
        <label htmlFor="password">Password:</label>
        <input
          type={visibility}
          name="password"
          placeholder="password"
          id="password"
          onChange={passwordChangeHandler}
          value={password}
          required
        />
        <button onClick={changeVis} type="button" className="visibility">
          {visibility === 'password' ? 'Show password' : 'Hide password'}
        </button>
      </div>
      {loading ? (
        <button className="signinbutton" type="submit">
          <CircularProgress style={{ margin: '0 auto' }} />
        </button>
      ) : (
        <>
          <button className="signinbutton" type="submit">
            Login
          </button>
          <p className="text-danger">{error}</p>
          <Link to="/register">
            <button className="signinbutton">Don't have an account</button>
          </Link>
        </>
      )}
    </form>
  );
};

export default LoginForm;
