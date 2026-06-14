import React, { useState, useEffect } from "react";
import useCrud from "../../../hooks/useCrud";

export default function Filtro({
  offer,
  match,
  setMatch,
  selectedTags,
  setSelectedTags,
  applicants,
  setApplicants,
  jobSkills = [],
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInterviewConfirm, setShowInterviewConfirm] = useState(false);
  const [showInterviewSuccess, setShowInterviewSuccess] = useState(false);

  // Fallback a los tags hardcodeados si la oferta no tiene requerimientos
  const tags = jobSkills.length > 0 ? jobSkills : [
    "React", "Node.js", "Java", "Spring", "Python", "MongoDB", "Tailwind", "AWS"
  ];

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

  const { patchModel, getModel } = useCrud("");

  // =========================
  // DESCARTAR POR MATCH
  // =========================
  const discardByMatch = async () => {
    // 1. Filtrar a los que van a ser descartados
    const toDiscard = applicants.filter((a) => a.hiring_probability < match && a.status !== "rechazado");

    // 2. Hacer el llamado a la API por cada uno (o crear endpoint masivo, pero haremos loop)
    if (offer?.id) {
      for (const a of toDiscard) {
        try {
          await patchModel({ status: "rechazado" }, `/api/recruiter/jobs/${offer.id}/candidates/${a.id}/status`);
        } catch (e) {
          console.error("Error descartando a " + a.name);
        }
      }
    }

    // 3. Actualizar estado local
    setApplicants((prev) =>
      prev.map((a) =>
        a.hiring_probability < match
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
  // PASAR A ENTREVISTA POR MATCH
  // =========================
  const moveToInterviewByMatch = async () => {
    // 1. Filtrar a los que van a ser movidos a entrevista (los que cumplen el match y no están ya en entrevista/rechazados)
    const toInterview = applicants.filter(
      (a) => a.hiring_probability >= match && a.status !== "rechazado" && a.status !== "entrevista" && a.status !== "ganador"
    );

    // 2. Llamada a API
    if (offer?.id) {
      for (const a of toInterview) {
        try {
          await patchModel({ status: "entrevista" }, `/api/recruiter/jobs/${offer.id}/candidates/${a.id}/status`);
        } catch (e) {
          console.error("Error moviendo a entrevista a " + a.name);
        }
      }
    }

    // 3. Actualizar estado local
    setApplicants((prev) =>
      prev.map((a) =>
        a.hiring_probability >= match && a.status !== "rechazado" && a.status !== "entrevista" && a.status !== "ganador"
          ? { ...a, status: "entrevista" }
          : a
      )
    );

    setShowInterviewConfirm(false);

    setTimeout(() => {
      setShowInterviewSuccess(true);
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
            <span className="bg-[#F5A844] text-white px-3 py-1 rounded-full text-xs">
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

          <div className="bg-[#1C6B72] text-white px-4 py-2 rounded-xl text-center min-w-[90px]">
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
          Probabilidad IA mínima
        </h3>

        <div className="flex justify-between mb-2 text-sm">
          <span>0%</span>
          <span className="font-bold text-[#F5A844]">
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
          className="w-full accent-[#1C6B72]"
        />

        {/* BOTÓN DESCARTAR */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => setShowInterviewConfirm(true)}
            className="w-full bg-[#F5A844] hover:bg-[#e0983c] text-white py-2 rounded-xl transition font-semibold"
          >
            Pasar a Entrevista
          </button>
          
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition font-semibold"
          >
            Descartar postulantes
          </button>
        </div>
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[420px]">

            <h2 className="font-bold text-lg mb-3">
              Confirmar descarte
            </h2>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de descartar postulantes con Probabilidad IA menor a{" "}
              <span className="font-bold text-[#1C6B72]">
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
              className="bg-[#1C6B72] text-white px-5 py-2 rounded-xl"
            >
              Aceptar
            </button>

          </div>
        </div>
      )}

      {/* ================= INTERVIEW CONFIRM MODAL ================= */}
      {showInterviewConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[420px]">
            <h2 className="font-bold text-lg mb-3">
              Mover a Entrevista
            </h2>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de pasar a la etapa de entrevista a los postulantes con Probabilidad IA mayor o igual a{" "}
              <span className="font-bold text-[#1C6B72]">
                {match}%
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowInterviewConfirm(false)}
                className="border px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={moveToInterviewByMatch}
                className="bg-[#F5A844] text-white px-4 py-2 rounded-xl font-semibold"
              >
                Sí, avanzar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERVIEW SUCCESS MODAL ================= */}
      {showInterviewSuccess && (
        <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl w-[420px] text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold">
              Postulantes promovidos
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Los candidatos fueron movidos a la etapa de “entrevista”.
            </p>
            <button
              onClick={() => setShowInterviewSuccess(false)}
              className="bg-[#1C6B72] text-white px-5 py-2 rounded-xl"
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
                className="accent-[#1C6B72]"
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>

      </div>

    </div>
  );
}