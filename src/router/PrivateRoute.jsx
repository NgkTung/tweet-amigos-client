import PropTypes from "prop-types";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element,
};

export default PrivateRoute;
