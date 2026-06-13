import { useState } from "react";
import { useLocation } from "react-router-dom";

import RecruiterLeftSidebar from "../../../components/recruiter/Postulation/Challenge";
import RecruiterRightSidebar from "../../../components/recruiter/Postulation/Filtro";
import RecruiterPostulations from "../../../components/recruiter/Postulation/RecrutierPastulations";

export default function Postulations() {
  const { state } = useLocation();
  const offer = state?.offer;

  // Estados compartidos
  const [match, setMatch] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="w-full flex gap-6 recruiter-theme">

      {/* Sidebar izquierdo */}
      <div className="w-[280px] shrink-0">
        <RecruiterLeftSidebar />
      </div>

      {/* Contenido principal */}
      <div className="flex-1">
        <RecruiterPostulations
          offer={offer}
          match={match}
          selectedTags={selectedTags}
        />
      </div>

      {/* Sidebar derecho */}
      <div className="w-[280px] shrink-0">
        <RecruiterRightSidebar
          offer={offer}
          match={match}
          setMatch={setMatch}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>

    </div>
  );
}