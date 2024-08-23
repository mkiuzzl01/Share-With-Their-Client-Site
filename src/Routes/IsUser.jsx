import React from 'react';
import Loading from '../components/Pages/Loading/Loading';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const IsUser = ({children}) => {
    const { user, loading } = useAuth();

    if (loading) return <Loading></Loading>;
    if (user.Role == "User") {
      return children;
    }
  
    return <Navigate to="/Login"></Navigate>;
};

export default IsUser;