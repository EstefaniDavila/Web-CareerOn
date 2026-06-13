import { useLocation } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";
import FeedCentral from "../components/FeedCentral";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";
import RecruiterLeftSidebar from "../components/recruiter/RecruiterLeftSidebar";
import RecruiterCentral from "../components/recruiter/RecruiterCentral";
import RecruiterRightSidebar from "../components/recruiter/RecruiterRightSidebar";

export default function Dashboard() {
  const { userType, loading } = useUserStatus();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="w-10 h-10 border-4 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isRecruiter = userType === "Empresa" || location.pathname === "/recruiter/dashboard";

  if (isRecruiter) {
    return (
      <div className="w-full flex flex-col gap-6 recruiter-theme">
        <div className="flex gap-6 w-full items-start justify-center">
          <RecruiterLeftSidebar />
          <RecruiterCentral />
          <RecruiterRightSidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 w-full items-start justify-center">
        <LeftSidebar />
        <FeedCentral />
        <RightSidebar />
      </div>
    </div>
  );
}
