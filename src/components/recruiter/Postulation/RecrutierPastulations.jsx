import React, { useState } from "react";
import ProfileModal from "../../../composables/Recutrier/Postulation/Profilemodal";
import useCrud from "../../../hooks/useCrud";

const RecruiterPostulations = ({ offer, applicants = [], setApplicants, match = 0, selectedTags = [] }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  
  const { patchModel } = useCrud("");

  // 🔥 CAMBIAR ESTADO DESDE MODAL CONECTADO AL BACKEND
  const updateStatus = async (id, newStatus) => {
    try {
      const url = `/api/recruiter/jobs/${offer?.id}/candidates/${id}/status`;
      console.log("🔥 PATCH URL:", url, "| body:", { status: newStatus });
      if (offer?.id) {
        const result = await patchModel({ status: newStatus }, url);
        console.log("✅ PATCH result:", result);
      } else {
        console.warn("⚠️ offer.id no está definido, no se puede guardar en BD");
      }
      setApplicants((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: newStatus } : a
        )
      );
    } catch (error) {
      console.error("❌ Error updating status:", error?.response?.data || error);
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
        ? a.status !== "rechazado"   // "Todos" = activos (excluye rechazados)
        : a.status === statusFilter;

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