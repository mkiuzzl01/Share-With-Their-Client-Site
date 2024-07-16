import axios from "axios";
import {useContext, useEffect} from "react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("Token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await LogOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
