import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

interface Props {
  element: JSX.Element;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
