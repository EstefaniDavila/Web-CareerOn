import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import IAMissionModal from "../../../composables/Student/IAMissionsmodal";

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
    description: "Mejora tu CV con IA",
    activity:
      "Analiza tu CV y reescribe tu experiencia usando logros cuantificables.",
    rewardCoins: 50,
    rewardXP: 100,
  },
];

export default function Challenge() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const [postuladas, setPostuladas] = useState(mockPostuladas);
  const [iaMissions] = useState(mockIAMissions);

  const [files, setFiles] = useState({});

  const [selectedIAMission, setSelectedIAMission] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  const allData = [...postuladas, ...iaMissions];

  const filtered = allData.filter((item) => {
    const matchTab = tab === "all" ? true : item.type === tab;

    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  /* ---------------- POSTULADAS ---------------- */

  const handleFileChange = (e, id) => {
    setFiles((prev) => ({
      ...prev,
      [id]: e.target.files[0],
    }));
  };

  const handleSend = (item) => {
    if (!files[item.id]) return;

    setPostuladas((prev) => prev.filter((m) => m.id !== item.id));
    alert("✅ Reto enviado correctamente a la empresa");
  };

  /* ---------------- IA ---------------- */

  const handleOpenIAMission = (mission) => {
    setSelectedIAMission(mission);
    setUserAnswer("");
    setResult(null);
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;

    const score = Math.floor(Math.random() * 41) + 60;

    setResult({
      score,
      feedback:
        score > 85
          ? "Excelente trabajo 🚀"
          : score > 70
          ? "Buen trabajo, pero puedes mejorar"
          : "Debes reforzar tus habilidades",
    });
  };

  const handleClose = () => {
    setSelectedIAMission(null);
    setUserAnswer("");
    setResult(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">

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
              className={`px-4 py-2 rounded-lg transition ${
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
        <div className="grid gap-4 w-full">
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

              {/* POSTULADAS */}
              {item.type === "postulado" && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">

                  <p className="text-sm text-[#5F6368]">
                    {item.description}
                  </p>

                  <label className="flex items-center gap-2 text-sm cursor-pointer text-[#5F6368] hover:text-[#5B34F2] transition">
                    <FiUploadCloud />
                    Subir archivo
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, item.id)}
                    />
                  </label>

                  <button
                    onClick={() => handleSend(item)}
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
              )}

              {/* IA */}
              {item.type === "ia" && (
                <button
                  onClick={() => handleOpenIAMission(item)}
                  className="mt-3 text-sm text-[#0F6C7A] underline"
                >
                  Ver misión IA →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL IA */}
      <IAMissionModal
        selectedIAMission={selectedIAMission}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        onEvaluate={handleEvaluate}
        result={result}
        onClose={handleClose}
      />
    </div>
  );
}