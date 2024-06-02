import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const token = localStorage.getItem("jwtToken");
  return token ? element : <Navigate to="/signIn" />;
};
export default PrivateRoute;
