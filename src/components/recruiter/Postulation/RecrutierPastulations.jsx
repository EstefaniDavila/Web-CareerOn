import React, { useState } from "react";
import ProfileModal from "../../../composables/Recutrier/Postulation/Profilemodal";
import useCrud from "../../../hooks/useCrud";

const RecruiterPostulations = ({ offer, applicants = [], setApplicants, match = 0, selectedTags = [] }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const { patchModel } = useCrud("");

  const updateStatus = async (id, newStatus) => {
    try {
      const url = `/api/recruiter/jobs/${offer?.id}/candidates/${id}/status`;
      if (offer?.id) {
        const result = await patchModel({ status: newStatus }, url);
        console.log("✅ PATCH result:", result);
      } else {
        console.warn(" offer.id no está definido, no se puede guardar en BD");
      }
      setApplicants((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: newStatus } : a
        )
      );
    } catch (error) {
      console.error(" Error updating status:", error?.response?.data || error);
      alert("Hubo un error al actualizar el estado del candidato.");
    }
  };

  const filteredApplicants = applicants.filter((a) => {
    const text = search.toLowerCase();

    const passSearch =
      a.name.toLowerCase().includes(text) ||
      a.career.toLowerCase().includes(text);

    const passMatch = a.hiring_probability >= match;

    const passTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) =>
        a.knowledge.includes(tag)
      );

    const passStatus =
      statusFilter === "todos"
        ? a.status !== "rechazado"
        : a.status === statusFilter;

    return passSearch && passMatch && passTags && passStatus;
  });

  return (
    <div className="min-h-screen p-8">

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
          <option value="entrevista">Resolvió Reto</option>
          <option value="entrevista_final">Entrevista Final</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>

      <div className="mt-8 space-y-5">
        {filteredApplicants.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-xl">{a.name}</h2>
              <p className="text-gray-500">{a.career}</p>
              {a.status.toLowerCase() === "entrevista" ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Resolvió su reto
                  </span>
                  <span
                    className="text-xs text-[#1C6B72] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                    onClick={() => setSelectedApplicant(a)}
                  >
                    ¡Mira el análisis! ➜
                  </span>
                </div>
              ) : a.status.toLowerCase() === "entrevista_final" ? (
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">
                    Entrevista Final Programada
                  </span>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-1 uppercase font-semibold text-xs tracking-wider">{a.status}</p>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-gray-500">Probabilidad IA</span>
              <div className="text-2xl font-bold text-[#F5A844]">
                {a.hiring_probability}%
              </div>
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

      <ProfileModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onChangeStatus={updateStatus}
      />
    </div>
  );
};

export default RecruiterPostulations;