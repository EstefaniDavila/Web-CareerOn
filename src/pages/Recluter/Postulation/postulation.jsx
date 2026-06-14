import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCrud from "../../../hooks/useCrud";

import RecruiterLeftSidebar from "../../../components/recruiter/Postulation/Challenge";
import RecruiterRightSidebar from "../../../components/recruiter/Postulation/Filtro";
import RecruiterPostulations from "../../../components/recruiter/Postulation/RecrutierPastulations";

export default function Postulations() {
  const { state } = useLocation();
  const offer = state?.offer;

  const [match, setMatch] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);

  // Usamos el custom hook pasándole la ruta completa
  const { getModel } = useCrud(offer?.id ? `/api/recruiter/jobs/${offer.id}/candidates` : "");

  useEffect(() => {
    if (offer?.id) {
      getModel()
        .then((res) => {
          if (res?.candidates) {
            setApplicants(res.candidates);
          }
          if (res?.job_skills) {
            setJobSkills(res.job_skills);
          }
        })
        .catch((err) => console.error("Error fetching candidates:", err));
    }
  }, [offer?.id]);

  return (
    <div className="w-full flex gap-6 recruiter-theme">

      {/* LEFT */}
      <div className="w-[280px] shrink-0">
        <RecruiterLeftSidebar offer={offer} applicants={applicants} />
      </div>

      {/* CENTER */}
      <div className="flex-1">
        <RecruiterPostulations
          offer={offer}
          match={match}
          selectedTags={selectedTags}
          applicants={applicants}
          setApplicants={setApplicants}
        />
      </div>

      {/* RIGHT */}
      <div className="w-[280px] shrink-0">
        <RecruiterRightSidebar
          offer={offer}
          match={match}
          setMatch={setMatch}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          applicants={applicants}
          setApplicants={setApplicants}
          jobSkills={jobSkills}
        />
      </div>

    </div>
  );
}