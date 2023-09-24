import React, { useState } from 'react';

const Register = (props) => {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="fName">First name</label>
      <input
        type="text"
        name="fName"
        placeholder="First Name"
        required
        onChange={fNameChangeHandler}
        value={fName}
      />
      <label htmlFor="lName">Last Name</label>
      <input
        type="text"
        name="lName"
        placeholder="Last Name"
        required
        onChange={lNameChangeHandler}
        value={lName}
      />
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        placeholder="username"
        required
        onChange={usernameChangeHandler}
        value={username}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="example@email.com"
        id="email"
        required
        onChange={emailChangeHandler}
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        id="password"
        required
        onChange={passwordChangeHandler}
        value={password}
      />
      <label htmlFor="password2">Re-enter Password</label>
      <input
        type="password"
        name="password2"
        placeholder="password"
        id="password2"
        required
        onChange={password2ChangeHandler}
        value={password2}
      />
      <button type="submit">Register</button>
      <button onClick={props.loginSwitch}>Already have an account</button>
    </form>
  );
};

export default Register;
