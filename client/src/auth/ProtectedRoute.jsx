// ProtectedRoute.js
import React from "react";
import { useAuth } from "./Auth";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { state } = useAuth();

  return (
    <Route
      {...rest}
      element={state.isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
