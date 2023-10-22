import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const ProtectedRoute = () => {
  const token = cookie.get('TOKEN');
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
