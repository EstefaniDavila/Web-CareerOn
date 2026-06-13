import { useState } from "react";
import { useLocation } from "react-router-dom";

const tags = [
  "React", "Node.js","Java","Spring","Python","MongoDB","Tailwind","AWS",];

export default function Filtro({
  offer,
  match,
  setMatch,
  selectedTags,
  setSelectedTags,
}) {

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="sticky top-6 space-y-6">

            {/* Header */}

        <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-start justify-between ">
                <div>
                <span className="inline-block bg-[#0F6C7A] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Oferta laboral</span>
                <h2 className="text-xl font-bold text-[#1C1C1C] mt-3">
                    {offer?.title ?? "Oferta sin nombre"}
                </h2>
                <p className="text-[#5F6368] mt-2">
                    📍 {offer?.location ?? "Ubicación"}
                </p>
                <p className="text-[#5F6368]">
                    💼 {offer?.type ?? "Modalidad"}
                </p>

                </div>

                <div className="bg-[#5B34F2] rounded-xl px-4 py-2 text-center text-white min-w-[90px]">
                    <h3 className="text-xl font-bold">
                        {offer?.applicants ?? 0}
                    </h3>
                    <span className="text-xs">
                        postulantes
                    </span>
                </div>

            </div>

            </div>

      {/* Filtro Match */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h3 className="font-bold text-[#1C1C1C] mb-4">
          Match mínimo
        </h3>

        <div className="flex justify-between mb-2">

          <span className="text-[#5F6368]">
            0%
          </span>

          <span className="font-bold text-[#0F6C7A]">
            {match}%
          </span>

          <span className="text-[#5F6368]">
            100%
          </span>

        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={match}
          onChange={(e) => setMatch(Number(e.target.value))}
          className="w-full accent-[#5B34F2]"
        />

      </div>

      {/* Etiquetas */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h3 className="font-bold text-[#1C1C1C] mb-4">
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

              <span className="text-[#5F6368]">
                {tag}
              </span>

            </label>

          ))}

        </div>

      </div>

    </div>
  );
}

