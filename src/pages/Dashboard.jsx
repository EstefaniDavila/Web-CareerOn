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
          <div className="hidden lg:block shrink-0 self-start sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto custom-scrollbar">
            <RecruiterLeftSidebar />
          </div>
          <div className="flex-1 min-w-0 pb-12">
            <RecruiterCentral />
          </div>
          <div className="hidden xl:block shrink-0 self-start sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto custom-scrollbar">
            <RecruiterRightSidebar />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 w-full items-start justify-center">
        <div className="hidden lg:block shrink-0 self-start sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto custom-scrollbar">
          <LeftSidebar />
        </div>
        <div className="flex-1 min-w-0 pb-12">
          <FeedCentral />
        </div>
        <div className="hidden xl:block shrink-0 self-start sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto custom-scrollbar">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}