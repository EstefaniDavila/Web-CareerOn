import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../pages/onboarding/Onboarding";
import NotFound from "../pages/errors/NotFound";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/errors/Unauthorized";
import Offers from "../pages/offers/Offers";
import CvOptimizer from "../pages/cv/CvOptimizer";
import JobSwipe from "../pages/student/JobSwipe";
import Profile from "../pages/student/Profile";

export default function AppRoutes() {
  const isAuthenticated = !!localStorage.getItem("mock_token");

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
          //<ProtectedRoute>
            <Onboarding />
          //</ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          //<ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          //</ProtectedRoute>
        }
      />

      <Route
        path="/offers"
        element={
          <Layout>
            <Offers />
          </Layout>
        }
      />

      <Route
        path="/recruiter/dashboard"
        element={
          //<ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          //</ProtectedRoute>
        }
      />

      {/* Aquí podemos agregar más rutas protegidas para CV Optimizer, Talent Search, etc */}
      <Route
        path="/explorar"
        element={
          <Layout>
            <JobSwipe />
          </Layout>
        }
      />
      <Route
        path="/cv-optimizer"
        element={
          <Layout>
            <CvOptimizer />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
