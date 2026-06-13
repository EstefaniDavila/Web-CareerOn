import { Navigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { useUserStatus } from "../hooks/useUserStatus";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  useUserStatus();

  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--color-brand-bg)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-brand-subtext)] text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
