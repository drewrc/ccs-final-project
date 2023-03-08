import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/auth-context/AuthContext";

//ProtectedRoute directs user to login page
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log({ isAuthenticated });
  //if isAuthenticated = False, we are redirected to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  //if isAuthenticated = True, we see rendered content components
  return <Outlet />;
};

export default ProtectedRoute;
