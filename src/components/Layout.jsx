import { useUserStatus } from "../hooks/useUserStatus";
import Navbar from "./Navbar";
import RecruiterNavbar from "./recruiter/RecruiterNavbar";
import { useLocation, matchPath } from "react-router-dom";

export default function Layout({ children }) {
  const { userType, loading } = useUserStatus();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F4F8]">
        <div className="w-12 h-12 border-4 border-[#1C6B72] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isRecruiter =
    userType === "Empresa" ||
    location.pathname === "/recruiter/dashboard" ||
    location.pathname === "/recruiter/profile" ||
    location.pathname === "/offers" ||
     matchPath("/offers/:id", location.pathname);

  return (
    <div
      className={`flex flex-col min-h-screen ${isRecruiter
        ? "recruiter-theme bg-[var(--color-brand-bg)]"
        : "bg-[var(--color-brand-bg)]"
        }`}
    >
      {isRecruiter ? <RecruiterNavbar /> : <Navbar />}
      <main className="flex-1 flex justify-center w-full py-6">
        <div className="w-full max-w-[1600px] px-4 md:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}