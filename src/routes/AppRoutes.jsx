import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../pages/onboarding/Onboarding";
import NotFound from "../pages/errors/NotFound";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/errors/Unauthorized";

export default function AppRoutes() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/onboarding" replace /> : <Login />}
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Aquí podemos agregar más rutas protegidas para CV Optimizer, Talent Search, etc */}
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
