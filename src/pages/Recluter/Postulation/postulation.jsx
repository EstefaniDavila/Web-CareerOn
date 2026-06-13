import RecruiterLeftSidebar from "../../../components/recruiter/RecruiterLeftSidebar";
import RecruiterRightSidebar from "../../../components/recruiter/RecruiterRightSidebar";
import RecruiterPostulations from "../../../components/recruiter/Postulation/RecrutierPastulations";

export default function Postulations() {
  return (
    <div className="w-full flex flex-col gap-6 recruiter-theme">
      <div className="flex gap-6 w-full items-start justify-center">
        <RecruiterLeftSidebar />
        <RecruiterPostulations />
        <RecruiterRightSidebar />
      </div>
    </div>
  );
}