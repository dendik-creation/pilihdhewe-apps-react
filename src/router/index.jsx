import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template from "../template/Template";
import LoginPages from "../pages/LoginPages";
import { DefaultRoute, RequireAuth } from "./Middleware";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <RequireAuth>
              <Template />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <DefaultRoute>
              <LoginPages />
            </DefaultRoute>
          }
        />
      </Routes>
    </Router>
  );
}
