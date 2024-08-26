import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://share-with-their-server.vercel.app'
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
