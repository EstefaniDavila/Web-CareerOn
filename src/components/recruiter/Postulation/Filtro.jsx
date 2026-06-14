import React, { useState } from "react";

const tags = [
  "React",
  "Node.js",
  "Java",
  "Spring",
  "Python",
  "MongoDB",
  "Tailwind",
  "AWS",
];

export default function Filtro({
  offer,
  match,
  setMatch,
  selectedTags,
  setSelectedTags,
  applicants,
  setApplicants,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // =========================
  // TAGS
  // =========================
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // =========================
  // DESCARTAR POR MATCH
  // =========================
  const discardByMatch = () => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.match < match
          ? { ...a, status: "rechazado" }
          : a
      )
    );

    setShowConfirm(false);

    // pequeño delay para UX más natural
    setTimeout(() => {
      setShowSuccess(true);
    }, 200);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="sticky top-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="flex justify-between items-start">

          <div>
            <span className="bg-[#0F6C7A] text-white px-3 py-1 rounded-full text-xs">
              Oferta laboral
            </span>

            <h2 className="text-xl font-bold mt-3">
              {offer?.title ?? "Oferta sin nombre"}
            </h2>

            <p className="text-[#5F6368] mt-2">
              📍 {offer?.location ?? "Ubicación"}
            </p>

            <p className="text-[#5F6368]">
              💼 {offer?.type ?? "Modalidad"}
            </p>
          </div>

          <div className="bg-[#5B34F2] text-white px-4 py-2 rounded-xl text-center min-w-[90px]">
            <h3 className="text-xl font-bold">
              {offer?.applicants ?? 0}
            </h3>
            <span className="text-xs">postulantes</span>
          </div>

        </div>
      </div>

      {/* ================= MATCH ================= */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <h3 className="font-bold mb-4">
          Match mínimo
        </h3>

        <div className="flex justify-between mb-2 text-sm">
          <span>0%</span>
          <span className="font-bold text-[#0F6C7A]">
            {match}%
          </span>
          <span>100%</span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={match}
          onChange={(e) => setMatch(Number(e.target.value))}
          className="w-full accent-[#5B34F2]"
        />

        {/* BOTÓN DESCARTAR */}
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
        >
          Descartar postulantes
        </button>
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[420px]">

            <h2 className="font-bold text-lg mb-3">
              Confirmar descarte
            </h2>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de descartar postulantes con match menor a{" "}
              <span className="font-bold text-[#5B34F2]">
                {match}%
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="border px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>

              <button
                onClick={discardByMatch}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Sí, descartar
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= SUCCESS MODAL ================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center">

          <div className="bg-white p-8 rounded-2xl w-[420px] text-center">

            <div className="text-5xl mb-3">✅</div>

            <h2 className="text-xl font-bold">
              Postulantes descartados exitosamente
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Los candidatos fueron movidos a “rechazados”.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#5B34F2] text-white px-5 py-2 rounded-xl"
            >
              Aceptar
            </button>

          </div>
        </div>
      )}

      {/* ================= TAGS ================= */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <h3 className="font-bold mb-4">
          Filtrar por habilidades
        </h3>

        <div className="space-y-3">
          {tags.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="accent-[#5B34F2]"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>

      </div>
    </div>
  );
}