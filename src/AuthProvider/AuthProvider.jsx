import React, { useEffect, useState, createContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      LogOut();
    } else {
      try {
        const decoded = jwtDecode(token);
        getUser(decoded.emailOrPhone);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const getUser = async (emailOrPhone) => {
    try {
      const { data } = await axiosPublic.get(`/user/${emailOrPhone}`);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const LogOut = async () => {
    <Navigate to="/Login"></Navigate>;
    setUser(null);
    setLoading(false);
  };

  const shareTools = {
    setUser,
    LogOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={shareTools}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
