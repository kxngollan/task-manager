import React, { useState } from 'react';

const Register = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fNameChangeHandler = (event) => {
    setFName(event.target.value);
  };

  const lNameChangeHandler = (event) => {
    setLName(event.target.value);
  };

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
        type=""
        name="lName"
        placeholder="Last Name"
        required
        onChange={lNameChangeHandler}
        value={lName}
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
      <button type="submit">Register</button>
      <button>Already have an account</button>
    </form>
  );
};

export default Register;
