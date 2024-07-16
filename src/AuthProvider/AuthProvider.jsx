import React, { useEffect, useState } from "react";
import { createContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { jwtDecode } from "jwt-decode";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();


  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("Token");
    
    if(!token){
      <Navigate to='/Login'></Navigate>;
      setLoading(false);
      
    }
    if (token) {
      try {
        setLoading(true);
        const decoded = jwtDecode(token);
        getUser(decoded.emailOrPhone);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const getUser = async (emailOrPhone) => {
    try {
      setLoading(true);
      const { data } = await axiosPublic.get(`/user/${emailOrPhone}`);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const shareTools = {
    setUser,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={shareTools}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
