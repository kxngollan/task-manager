import React, { useState } from 'react';

const Login = (props) => {
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
      <button onClick={props.loginSwitch}>Don't have an account</button>
    </form>
  );
};

export default Login;
