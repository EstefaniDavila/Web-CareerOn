import React, { useEffect, useState } from "react";
import useCrud from "../../../hooks/useCrud";

export default function Rightcomponent() {
  const [profile, setProfile] = useState(null);
  const [completedQuests, setCompletedQuests] = useState([]);

  const { getModel } = useCrud("/api/student/profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getModel();
        if (res && res.data) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Error fetching profile for Rightcomponent", error);
      }
    };
    fetchProfile();

    const saved = localStorage.getItem('careeron_quests');
    if (saved) {
      const quests = JSON.parse(saved);
      setCompletedQuests(quests.filter(q => q.completed));
    }
  }, []);

  const coins = profile?.coins || 0;
  const xp = (profile?.skills?.length || 0) * 100 + (completedQuests.length * 50);

  const recentMissions = completedQuests.length > 0 
    ? completedQuests.map((q, idx) => ({
        id: `quest-${idx}`,
        title: `Misión de ${q.skill}`,
        company: "UTP AI",
        score: q.score || 100
      }))
    : profile?.skills?.map((s, idx) => ({
        id: `skill-${idx}`,
        title: `Habilidad: ${s.Skill?.name || 'Desconocida'}`,
        company: "Certificado",
        score: s.level === 'Avanzado' ? 95 : s.level === 'Intermedio' ? 85 : 75
      })) || [];

  return (
    <div className="hidden lg:flex flex-col gap-6 p-4 bg-[#F6F8FB] min-h-screen">
      
      {/* Recompensas */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#EEF2F6]">
        <h2 className="text-lg font-bold text-[#111827] mb-4 border-b border-gray-100 pb-2">
          Tus recompensas
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#6B7280]">Monedas</span>
            <span className="font-bold text-[var(--color-brand-primary)] text-lg bg-gray-50 px-3 py-1 rounded-lg">
              {coins} M
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#6B7280]">Experiencia</span>
            <span className="font-bold text-[var(--color-brand-primary)] text-lg bg-gray-50 px-3 py-1 rounded-lg">
              {xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Simulador Pro CTA */}
      <div className="bg-[var(--color-brand-primary)] rounded-2xl p-5 shadow-md text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-6xl opacity-10 font-serif">?</div>
        <h2 className="text-lg font-bold mb-2 relative z-10">Simulador Pro</h2>
        <p className="text-xs text-white/80 mb-4 leading-relaxed relative z-10">
          Usa tus monedas para desbloquear simulaciones de entrevistas técnicas personalizadas.
        </p>
        <button 
          onClick={() => alert("¡Pronto podrás configurar tu entrevista técnica personalizada usando tus monedas!")}
          className="w-full bg-white text-[var(--color-brand-primary)] font-bold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors shadow-sm relative z-10 flex justify-center items-center gap-2"
        >
          <span>Practicar Entrevista</span>
          <span className="bg-[var(--color-brand-primary)] text-white text-[10px] px-2 py-0.5 rounded-full">100 M</span>
        </button>
      </div>

      {/* Misiones Completadas */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#EEF2F6]">
        <h2 className="text-lg font-bold text-[#111827] mb-4 border-b border-gray-100 pb-2">
          Últimas misiones
        </h2>

        <div className="flex flex-col gap-2">
          {recentMissions.length > 0 ? (
            recentMissions.map((m) => (
              <div
                key={m.id}
                className="py-3 border-b last:border-none border-[#F1F5F9] group hover:bg-gray-50 rounded-lg transition-colors -mx-2 px-2"
              >
                <p className="text-sm font-semibold text-[#111827] leading-tight mb-1">
                  {m.title}
                </p>

                <p className="text-xs text-[#6B7280] mb-1">
                  {m.company}
                </p>

                <p className="text-xs text-[var(--color-brand-primary)] font-bold bg-gray-50 inline-block px-2 py-0.5 rounded">
                  Score: {m.score}/100
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 py-4 text-center">Aún no has completado misiones.</p>
          )}
        </div>
      </div>

    </div>
  );
}