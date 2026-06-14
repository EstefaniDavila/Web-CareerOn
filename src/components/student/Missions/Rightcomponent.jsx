import React from "react";

/* MOCK DATA */
const mockStats = {
  coins: 320,
  xp: 1250,
};

const mockCompletedMissions = [
  {
    id: 1,
    title: "Optimización de CV con IA",
    company: "UTP AI",
    score: 92,
  },
  {
    id: 2,
    title: "Landing Page React",
    company: "Amazon",
    score: 88,
  },
  {
    id: 3,
    title: "API REST Spring Boot",
    company: "Google",
    score: 95,
  },
];

export default function Rightcomponent() {
  return (
    <div className="hidden lg:flex flex-col gap-6 p-4 bg-[#F6F8FB] min-h-screen">

      {/* 💰 STATS CARD */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-[#EEF2F6]">
        <h2 className="text-2xl font-semibold text-[#111827] mb-4">
          Tus recompensas
        </h2>

        <div className="flex flex-col gap-3">

          <div className="flex justify-between items-center">
            <span className="text-xl text-[#6B7280]">Monedas</span>
            <span className="font-bold text-[#5B34F2] text-2xl">
              🪙 {mockStats.coins}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl text-[#6B7280]">Experiencia</span>
            <span className="font-bold text-emerald-600 text-2xl">
              ⭐ {mockStats.xp}
            </span>
          </div>

        </div>
      </div>

      {/* 📜 HISTORY CARD */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#EEF2F6]">
        <h2 className="text-xl font-semibold text-[#111827] mb-4">
          Últimas misiones completadas
        </h2>

        <div className="flex flex-col gap-3">

          {mockCompletedMissions.map((m) => (
            <div
              key={m.id}
              className="py-2 border-b last:border-none border-[#F1F5F9]"
            >
              <p className="text-lg font-medium text-[#111827]">
                {m.title}
              </p>

              <p className="text-xs text-[#6B7280]">
                {m.company}
              </p>

              <p className="text-sm text-emerald-600 font-medium mt-1">
                ⭐ Score: {m.score}/100
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}