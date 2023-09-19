import { useState } from 'react';

const register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
    <form>
      <label for="email">email</label>
      <input
        type="email"
        name="email"
        placeholder="example@email.com"
        id="email"
        required
        onChange={emailChangeHandler}
        value={email}
        />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        id="password"
        required
        onChange={passwordChangeHandler}
        value={password}
        />
      <button>Register</button> 
      <button>Aready have an account</button>
    </form>
  );
};

export default register;
