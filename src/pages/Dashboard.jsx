import FeedCentral from "../components/FeedCentral";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";

export default function Dashboard() {
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
