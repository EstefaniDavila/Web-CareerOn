import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar";
import { FiUploadCloud } from "react-icons/fi";

const mockPostuladas = [
  {
    id: 1,
    title: "API REST con Spring Boot",
    type: "postulado",
    company: "Google",
    description: "Construir API REST con autenticación JWT",
  },
  {
    id: 2,
    title: "Landing Page React",
    type: "postulado",
    company: "Amazon",
    description: "Crear landing page responsive con React",
  },
];

const mockIAMissions = [
  {
    id: 3,
    title: "Optimización de CV con IA",
    type: "ia",
    company: "UTP AI",
  },
];

export default function Missions() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const [postuladas, setPostuladas] = useState(mockPostuladas);
  const [iaMissions] = useState(mockIAMissions);

  // 🔥 archivo por misión (no global)
  const [files, setFiles] = useState({});
  const [selectedMission, setSelectedMission] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const allData = [...postuladas, ...iaMissions];

  const filtered = allData.filter((item) => {
    const matchTab = tab === "all" ? true : item.type === tab;

    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  // 📁 subir archivo por misión
  const handleFileChange = (e, missionId) => {
    setFiles((prev) => ({
      ...prev,
      [missionId]: e.target.files[0],
    }));
  };

  // 🟦 abrir confirmación
  const handleOpenConfirm = (mission) => {
    if (!files[mission.id]) return;

    setSelectedMission(mission);
    setShowConfirm(true);
  };

  // ✅ enviar reto
  const handleConfirmSend = () => {
    setPostuladas((prev) =>
      prev.filter((m) => m.id !== selectedMission.id)
    );

    setFiles((prev) => {
      const copy = { ...prev };
      delete copy[selectedMission.id];
      return copy;
    });

    setSelectedMission(null);
    setShowConfirm(false);

    alert("✅ Reto enviado correctamente a la empresa");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">

      {/* SIDEBAR */}
      <div className="hidden lg:block shrink-0 sticky top-[88px] bg-[#F3F3F3]">
        <LeftSidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#1C1C1C]">
            Mis Misiones
          </h1>

          <input
            type="text"
            placeholder="Buscar misiones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 rounded-lg bg-white border border-[#DCE5EC] focus:outline-none focus:ring-2 focus:ring-[#5B34F2]"
          />
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["all", "postulado", "ia"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg ${
                tab === t
                  ? "bg-[#5B34F2] text-white"
                  : "bg-[#F3F3F3] text-[#1C1C1C]"
              }`}
            >
              {t === "all"
                ? "Todas"
                : t === "postulado"
                ? "Empresa"
                : "IA"}
            </button>
          ))}
        </div>

        {/* LISTA */}
        <div className="grid gap-4 w-1/2 ">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DCE5EC] rounded-xl p-4"
            >
              <h2 className="font-semibold text-[#1C1C1C]">
                {item.title}
              </h2>

              <p className="text-sm text-[#5F6368]">
                {item.company}
              </p>

              {/* EMPRESA */}
             {item.type === "postulado" && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">

                  {/* DESCRIPCIÓN */}
                  <div>
                    <p className="text-sm text-[#5F6368]">
                      {item.description}
                    </p>
                  </div>

                  {/* UPLOAD */}
                  <div className="flex flex-col gap-1">

                    <label className="flex items-center gap-2 text-sm cursor-pointer text-[#5F6368] hover:text-[#5B34F2] transition">
                      <FiUploadCloud />
                      Subir archivo
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, item.id)}
                      />
                    </label>

                    {/* 👇 MOSTRAR ARCHIVO SUBIDO */}
                    {files[item.id] && (
                      <span className="text-xs text-[#0F6C7A]">
                        📎 {files[item.id].name}
                      </span>
                    )}
                  </div>

                  {/* BOTÓN */}
                  <div>
                    <button
                      onClick={() => handleOpenConfirm(item)}
                      disabled={!files[item.id]}
                      className={`px-4 py-2 rounded-lg text-white transition ${
                        files[item.id]
                          ? "bg-[#5B34F2] hover:bg-[#4320C9]"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Enviar reto
                    </button>
                  </div>
                </div>
              )}
              {/* IA */}
              {item.type === "ia" && (
                <p className="text-sm mt-2 text-[#0F6C7A]">
                  Misión IA disponible
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg font-bold text-[#1C1C1C]">
              ¿Estás seguro de enviar tu reto a la empresa?
            </h2>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-[#F3F3F3] rounded-lg"
              >
                No
              </button>

              <button
                onClick={handleConfirmSend}
                className="px-4 py-2 bg-[#5B34F2] text-white rounded-lg"
              >
                Sí, enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}