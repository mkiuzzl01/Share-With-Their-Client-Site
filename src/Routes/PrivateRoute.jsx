import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Pages/Loading/Loading";


const PrivateRoute = ({ children }) => {
  const { user,loading} = useAuth();
  const location = useLocation();

  if (loading) return <Loading></Loading>
  if (user) return children;
  
  return <Navigate to="/Login" state={{ from: location }} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
