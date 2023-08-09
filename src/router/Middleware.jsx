import React from "react";
import { ACTIVE_USER } from "../utils/constant";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  if (!ACTIVE_USER) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export const DefaultRoute = ({ children }) => {
  if (ACTIVE_USER) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export const AdminOnly = ({ children }) => {
  if (ACTIVE_USER.user.role == "siswa") {
    return <Navigate to={"/events"} />;
  }
  return children;
};
