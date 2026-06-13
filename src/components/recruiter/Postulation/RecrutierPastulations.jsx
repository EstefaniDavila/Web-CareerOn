import React, { useState } from "react";
import ProfileModal from "../../../composables/Recutrier/Postulation/Profilemodal";

const applicants = [
  {
    id: 1,
    name: "Carlos Mendoza",
    career: "Ingeniería de Software - UTP",
    cycle: "8vo",
    email: "pepitogmail.com",
    cellphone: "054 - 34587",
    match: 98,
    softSkills: [
      "Trabajo en equipo",
      "Comunicación",
      "Liderazgo",
      "Pensamiento crítico",
    ],
    knowledge: [
      "React",
      "Redux",
      "Node.js",
      "MongoDB",
      "Docker",
    ],
  },
  {
    id: 2,
    name: "Valeria Ríos",
    career: "Ingeniería de Sistemas - UTP",
    cycle: "9no",
    email: "pepito@gmail.com",
    cellphone: "989 123 226",
    match: 94,
    softSkills: [
      "Resolución de problemas",
      "Comunicación",
      "Adaptabilidad",
    ],
    knowledge: [
      "React",
      "Next.js",
      "Tailwind",
      "Firebase",
    ],
  },
  {
    id: 3,
    name: "Daniel Babo",
    career: "Ingeniería de Sistemas - UTP",
    cycle: "9no",
    email: "pepita@gmail.com",
    cellphone: "987 123 226",
    match: 48,
    softSkills: [
      "Resolución de problemas",
      "Comunicación",
      "Adaptabilidad",
      "Pelea",
    ],
    knowledge: [
      "React",
      "Next.js",
      "Tailwind",
      "HTML",
    ],
  },
];

const RecruiterPostulations = ({
  offer,
  match,
  selectedTags,
}) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Mayor Match");

  // ===========================
  // FILTROS + BÚSQUEDA + ORDEN
  // ===========================
  const filteredApplicants = [...applicants]
    .filter((applicant) => {
      // Buscar
      const text = search.toLowerCase();

      const passSearch =
        applicant.name.toLowerCase().includes(text) ||
        applicant.career.toLowerCase().includes(text);

      // Match mínimo
      const passMatch = applicant.match >= match;

      // Habilidades
      const passTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          applicant.knowledge.includes(tag)
        );

      return passSearch && passMatch && passTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Mayor Match":
          return b.match - a.match;

        case "Menor Match":
          return a.match - b.match;

        case "Nombre":
          return a.name.localeCompare(b.name);

        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen p-8">

      {/* Buscador */}

      <div className="bg-white rounded-3xl shadow-md p-5 flex gap-4">

        <input
          type="text"
          placeholder="Buscar postulante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5B34F2]"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#5B34F2]"
        >
          <option>Mayor Match</option>
          <option>Menor Match</option>
          <option>Nombre</option>
        </select>

      </div>

      {/* Lista */}

      <div className="mt-8 space-y-5">

        {filteredApplicants.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-8 text-center text-[#5F6368]">
            No se encontraron postulantes.
          </div>

        ) : (

          filteredApplicants.map((applicant) => (

            <div
              key={applicant.id}
              className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-between"
            >

              {/* Información */}

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 rounded-full bg-[#5B34F2] text-white flex items-center justify-center text-xl font-bold">

                  {applicant.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}

                </div>

                <div>

                  <h2 className="text-xl font-bold text-[#1C1C1C]">
                    {applicant.name}
                  </h2>

                  <p className="text-[#5F6368]">
                    {applicant.career}
                  </p>

                  <p className="text-sm text-[#5F6368] mt-1">
                    {applicant.knowledge.join(" • ")}
                  </p>

                </div>

              </div>

              {/* Match */}

              <div className="text-center">

                <h2 className="text-4xl font-bold text-[#0F6C7A]">
                  {applicant.match}%
                </h2>

                <p className="text-[#5F6368]">
                  Match IA
                </p>

              </div>

              {/* Botón */}

              <div>

                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="px-5 py-3 rounded-xl border-2 border-[#5B34F2] text-[#5B34F2] hover:bg-[#5B34F2] hover:text-white transition"
                >
                  Ver perfil
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Modal */}

      <ProfileModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />

    </div>
  );
};

export default RecruiterPostulations;