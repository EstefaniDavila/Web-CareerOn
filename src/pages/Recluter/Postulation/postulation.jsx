import { useState } from "react";
import { useLocation } from "react-router-dom";

import RecruiterLeftSidebar from "../../../components/recruiter/Postulation/Challenge";
import RecruiterRightSidebar from "../../../components/recruiter/Postulation/Filtro";
import RecruiterPostulations from "../../../components/recruiter/Postulation/RecrutierPastulations";

const initialApplicants = [
  {
    id: 1,
    name: "Carlos Mendoza",
    career: "Ingeniería de Software - UTP",
    cycle: "8vo",
    email: "pepitogmail.com",
    cellphone: "054 - 34587",
    match: 98,
    status: "revision",
    softSkills: ["Trabajo en equipo"],
    knowledge: ["React", "Node.js"],
  },
  {
    id: 2,
    name: "Valeria Ríos",
    career: "Ingeniería de Sistemas - UTP",
    cycle: "9no",
    email: "pepito@gmail.com",
    cellphone: "989 123 226",
    match: 94,
    status: "entrevista",
    softSkills: ["Resolución de problemas"],
    knowledge: ["Next.js"],
  },
];

export default function Postulations() {
  const { state } = useLocation();
  const offer = state?.offer;

  // 🔥 ESTADOS GLOBALES (AHORA CORRECTO)
  const [match, setMatch] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [applicants, setApplicants] = useState(initialApplicants);

  return (
    <div className="w-full flex gap-6 recruiter-theme">

      {/* LEFT */}
      <div className="w-[280px] shrink-0">
        <RecruiterLeftSidebar />
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
        />
      </div>

    </div>
  );
}