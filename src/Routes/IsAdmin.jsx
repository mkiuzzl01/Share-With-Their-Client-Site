import { Navigate } from "react-router-dom";
import Loading from "../components/Pages/Loading/Loading";
import useAuth from "../hooks/useAuth";

const IsAdmin = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading></Loading>;
  if (user.Role == "Admin") {
    return children;
  }

  return <Navigate to="/Login"></Navigate>;
};

export default IsAdmin;
