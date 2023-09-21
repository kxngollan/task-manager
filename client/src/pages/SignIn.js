import React, { useState } from 'react';
import Login from '../components/userSignIn/Login';
import Register from '../components/userSignIn/Register';

const SignIn = () => {
  const [currentform, setCurrentForm] = useState(true);

  return (
    <>
      {currentform ? (
        <Login loginSwitch={() => setCurrentForm(!currentform)} />
      ) : (
        <Register loginSwitch={() => setCurrentForm(!currentform)} />
      )}
    </>
  );
};

export default SignIn;
