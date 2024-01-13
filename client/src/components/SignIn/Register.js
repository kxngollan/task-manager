import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import fetchURL from '../../util/fetchURL';
import { CircularProgress } from '@mui/material';

const RegisterForm = (props) => {
  const [match, setMatch] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    const newPassword = event.target.value;
    setPassword(event.target.value);
    if (newPassword === password2) {
      setMatch(true);
    } else setMatch(false);
  };

  const password2ChangeHandler = (event) => {
    const newPassword2 = event.target.value;
    setPassword2(newPassword2);

    if (newPassword2 === password) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password !== password2) {
      return console.log("Password doesn't match");
    } else {
      try {
        const response = await fetch(`${fetchURL}/signin/register`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        setLoading(false);
        redirect('/todolist');
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <form className="signin" onSubmit={handleSubmit} id="register-form">
      <div className="signinform">
        <h1>Your To Do List</h1>
        <h2>Register</h2>
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
      <div className="signinform">
        <label htmlFor="password2">Re-enter Password:</label>
        <input
          type="password"
          name="password2"
          placeholder="password"
          id="password2"
          onChange={password2ChangeHandler}
          value={password2}
        />
        {password.length > 0 &&
          password2.length > 0 &&
          (match ? (
            <p className="text-success">Passwords match</p>
          ) : (
            <p className="text-danger">Passwords don't match</p>
          ))}
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <button className="signinbutton" type="submit">
            Register
          </button>
          <Link to="/">
            <button className="signinbutton">Already have an account</button>
          </Link>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
