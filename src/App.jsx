import { BrowserRouter as Router } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./components/ui/use-toast";
import { ConfirmProvider } from "./components/custom/alert";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const { inProgress } = useMsal();

  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[var(--color-brand-bg)]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-brand-subtext)] text-sm">Cargando CarrerOn...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ConfirmProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ConfirmProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
