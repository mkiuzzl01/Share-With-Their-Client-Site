import axios from "axios";
import { Navigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://share-with-their-server.vercel.app",
});
const useAxiosSecure = () => {
   

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Token");
      config.headers.authorization = `Bearer ${token}`;
      // console.log("request stop by interceptor",token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const status = error.response.status;
      if (status == 401 || status == 403) {
       <Navigate to="/Login"></Navigate>
      }
      console.log(status);
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
