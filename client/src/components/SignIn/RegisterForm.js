import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const fetchURL = 'https://fullstack-list-backend.onrender.com';

const RegisterForm = (props) => {
  const [register, setRegister] = useState(false);
  const [match, setMatch] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== password2) {
      return console.log("Password doesn't match");
    } else {
      const configuration = {
        method: 'post',
        url: `${fetchURL}/register`,
        data: {
          email,
          password,
        },
      };

      axios(configuration)
        .then((result) => {
          cookies.set('TOKEN', result.data.token, {
            path: '/register',
          });
          window.location.href = '/todolist';

          setRegister(true);
        })
        .catch((error) => {
          error = new Error();
        });
    }
  };

  return (
    <>
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
          {!match ? (
            <p className="text-danger">Passwords don't match</p>
          ) : (
            <p className="text-success">Passwords match</p>
          )}
        </div>
        <button className="signinbutton" type="submit">
          Register
        </button>
        <Link to="/">
          <button className="signinbutton">Already have an account</button>
        </Link>
        {register ? (
          <p className="text-success">
            You Are Registered Successfully now go to login
          </p>
        ) : (
          <p className="text-danger">You Are Not Registered please try again</p>
        )}
      </form>
    </>
  );
};

export default RegisterForm;
