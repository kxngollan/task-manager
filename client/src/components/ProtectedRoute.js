import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import fetchURL from '../components/fetchURL';

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkLogin = useCallback(async () => {
    try {
      const response = await fetch(`${fetchURL}/checkLogin`, {
        method: 'get',
        credentials: 'include',
        headers: {
          'content-Type': 'application/JSON',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      console.log(data);

      if (data.authenticated) {
        console.log('Deffo Logged in');
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log('Error checking authentication:', error);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
