import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import fetchURL from '../../util/fetchURL';
import { CircularProgress } from '@mui/material';

const RegisterForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCase, setSpecialCase] = useState(false);
  const [length, setLength] = useState(false);
  const [password2, setPassword2] = useState('');
  const [match, setMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibility, setvisibility] = useState('password');
  const [visibility2, setvisibility2] = useState('password');

  const redirect = useNavigate();

  const changeVis = () => {
    if (visibility === 'password') {
      setvisibility('text');
    } else {
      setvisibility('password');
    }
  };

  const changeVis2 = () => {
    if (visibility2 === 'password') {
      setvisibility2('text');
    } else {
      setvisibility2('password');
    }
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const hasLowercase = (str) => {
    return /[a-z]/.test(str);
  };

  const hasUppercase = (str) => {
    return /[A-Z]/.test(str);
  };

  const hasNumber = (str) => {
    return /[0-9]/.test(str);
  };

  const hasSpecialCase = (str) => {
    return /[!@#$%^&*()_+=[\]{};':"\\|,.<>?/]/.test(str);
  };

  const passwordChangeHandler = (event) => {
    const newPassword = event.target.value;
    if (hasLowercase(newPassword)) {
      setLowercase(true);
    } else {
      setLowercase(false);
    }

    if (hasUppercase(newPassword)) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }

    if (hasNumber(newPassword)) {
      setNumber(true);
    } else {
      setNumber(false);
    }

    if (hasSpecialCase(newPassword)) {
      setSpecialCase(true);
    } else {
      setSpecialCase(false);
    }

    if (newPassword.length >= 8) {
      setLength(true);
    } else {
      setLength(false);
    }

    if (newPassword === password2) {
      setMatch(true);
    } else setMatch(false);

    setPassword(newPassword);
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
    if (match && lowercase && uppercase && specialCase && length) {
      try {
        const response = await fetch(`${fetchURL}/signin/register`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ email, password, password2 }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 422) {
          throw new Error('Email already exists');
        }

        if (response.status === 401) {
          throw new Error('Invalid Email or Password');
        }

        if (!response.ok) {
          throw new Error('Server Issue, please try again later!');
        }

        setLoading(false);
        redirect('/todolist');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      }
    } else if (!match) {
      setLoading(false);
      setError('Passwords do not match');
    } else {
      setLoading(false);
      setError('Invalid Password');
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
          type={visibility}
          name="password"
          placeholder="password"
          id="password"
          onChange={passwordChangeHandler}
          value={password}
        />
        <button onClick={changeVis} type="button" className="visibility">
          {visibility === 'password' ? 'Show password' : 'Hide password'}
        </button>
        {length ? (
          <p className="text-success">Password is 8 characters long</p>
        ) : (
          <p className="text-danger">
            Password must be at least 8 characters long
          </p>
        )}
        {lowercase ? (
          <p className="text-success">Password contains lowercase letter</p>
        ) : (
          <p className="text-danger">
            Password must contain at least 1 lowercase letter
          </p>
        )}
        {uppercase ? (
          <p className="text-success">Password contains uppercase letter</p>
        ) : (
          <p className="text-danger">
            Password must contain at least 1 uppercase letter
          </p>
        )}
        {number ? (
          <p className="text-success">Password contains number</p>
        ) : (
          <p className="text-danger">
            Password word must contain at least 1 number
          </p>
        )}

        {specialCase ? (
          <>
            <p className="text-success">Password contains special character</p>
            <p className="text-success">
              Special characters: ! @ # $ % ^ & * ( ) _ + - = [ ] {} ; ' : " \ \
              | , . / ? {'< >'}
            </p>
          </>
        ) : (
          <>
            <p className="text-danger">
              Password must contain at least 1 special character
            </p>
            <p className="text-danger">
              Special characters: ! @ # $ % ^ & * ( ) _ + - = [ ] {} ; ' : " \ \
              | , . / ? {'< >'}
            </p>
          </>
        )}
      </div>
      <div className="signinform">
        <label htmlFor="password2">Re-enter Password:</label>
        <input
          type={visibility2}
          name="password2"
          placeholder="password"
          id="password2"
          onChange={password2ChangeHandler}
          value={password2}
        />
        <button onClick={changeVis2} type="button" className="visibility">
          {visibility2 === 'password' ? 'Show password' : 'Hide password'}
        </button>
        {password.length > 0 &&
          password2.length > 0 &&
          (match ? (
            <p className="text-success">Passwords match</p>
          ) : (
            <p className="text-danger">Passwords don't match</p>
          ))}
      </div>
      {loading ? (
        <button className="signinbutton" type="button">
          <CircularProgress />
        </button>
      ) : (
        <>
          <button className="signinbutton" type="submit">
            Register
          </button>
          <p className="text-danger">{error}</p>
          <Link to="/">
            <button className="signinbutton">Already have an account</button>
          </Link>
        </>
      )}
    </form>
  );
};

export default RegisterForm;
