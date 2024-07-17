import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
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
        // LogOut();
        // navigate('/Login');
      }
      console.log(status);
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
