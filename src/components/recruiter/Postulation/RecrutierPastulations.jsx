import React, { useState } from "react";
import ProfileModal from "../../../composables/Recutrier/Postulation/Profilemodal";

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
    softSkills: ["Trabajo en equipo", "Comunicación"],
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
    knowledge: ["Next.js", "Firebase"],
  },
  {
    id: 3,
    name: "Daniel Babo",
    career: "Ingeniería de Sistemas - UTP",
    cycle: "9no",
    email: "pepita@gmail.com",
    cellphone: "987 123 226",
    match: 48,
    status: "rechazado",
    softSkills: ["Adaptabilidad"],
    knowledge: ["HTML", "CSS"],
  },
];

const RecruiterPostulations = ({ match = 0, selectedTags = [] }) => {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const filtered = applicants.filter(a => a.status !== "rechazado")

  // 🔥 CAMBIAR ESTADO DESDE MODAL
  const updateStatus = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };

  const filteredApplicants = applicants.filter((a) => {
    const text = search.toLowerCase();

    const passSearch =
      a.name.toLowerCase().includes(text) ||
      a.career.toLowerCase().includes(text);

    const passMatch = a.match >= match;

    const passTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) =>
        a.knowledge.includes(tag)
      );

    const passStatus =
      statusFilter === "todos" || a.status === statusFilter;

    return passSearch && passMatch && passTags && passStatus;
  });

  return (
    <div className="min-h-screen p-8">

      {/* FILTERS */}
      <div className="bg-white rounded-3xl shadow-md p-5 flex gap-4">

        <input
          type="text"
          placeholder="Buscar postulante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="todos">Todos</option>
          <option value="revision">En revisión</option>
          <option value="entrevista">Entrevista</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>

      {/* LIST */}
      <div className="mt-8 space-y-5">
        {filteredApplicants.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-xl">{a.name}</h2>
              <p className="text-gray-500">{a.career}</p>
              <p className="text-sm">{a.status}</p>
            </div>

            <div className="text-2xl font-bold text-[#0F6C7A]">
              {a.match}%
            </div>

            <button
              onClick={() => setSelectedApplicant(a)}
              className="border px-4 py-2 rounded-xl"
            >
              Ver perfil
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <ProfileModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onChangeStatus={updateStatus}
      />
    </div>
  );
};

export default RecruiterPostulations;