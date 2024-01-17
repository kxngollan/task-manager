import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const redirect = useNavigate();
  const token = localStorage.getItem('token');
  if (token) {
    return <Outlet />;
  } else {
    return redirect('/');
  }
};

export default ProtectedRoute;
