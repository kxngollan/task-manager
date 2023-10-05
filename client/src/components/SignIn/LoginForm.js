import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const fetchURL = 'https://fullstack-list-backend.onrender.com/login';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const configuration = {
      method: 'post',
      url: `${fetchURL}`,
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        cookies.set('TOKEN', result.data.user, {
          path: '/',
        });
        window.location.href = '/todolist';
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
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
      <Link to="/register">
        <button className="signinbutton">Don't have an account</button>
      </Link>
      {login ? (
        <p className="text-success">You Are Logged in Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Logged in</p>
      )}
    </form>
  );
};

export default LoginForm;
