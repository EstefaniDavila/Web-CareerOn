import React, { useState, useEffect } from "react";
import api from "../services/api";

const STATUS_CONFIG = {
  publicada: { label: "Publicada", className: "bg-emerald-50 text-emerald-800" },
  "en revision": { label: "En revisión", className: "bg-blue-50 text-blue-800" },
  entrevista: { label: "Entrevista", className: "bg-amber-50 text-amber-800" },
  terminada: { label: "Terminada", className: "bg-red-50 text-red-800" },
  // compatibility mapping
  active: { label: "Activa",  className: "bg-emerald-50 text-emerald-800" },
  paused: { label: "Pausada", className: "bg-amber-50 text-amber-800" },
  closed: { label: "Cerrada", className: "bg-red-50 text-red-800" },
};

const getPublishedText = (createdAt) => {
  if (!createdAt) return "Reciente";
  try {
    const date = new Date(createdAt);
    const diffTime = Math.abs(new Date() - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return "Hoy";
    if (diffDays === 1) return "Ayer";
    return `Hace ${diffDays} días`;
  } catch (e) {
    return "Reciente";
  }
};

const OffersList = ({ onEdit, onDeletePick }) => {
  const [search, setSearch] = useState("");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/recruiter/jobs");
        if (response.data && response.data.status === "success") {
          setOffers(response.data.jobs);
        }
      } catch (error) {
        console.error("Error al obtener las ofertas del reclutador:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const filtered = offers.filter(o =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = offers.filter(o => o.status === "publicada" || o.status === "active").length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-sm text-[#5F6368]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B34F2] mb-4"></div>
        Cargando tus ofertas...
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[15px] font-medium text-[#1C1C1C]">
          Mis ofertas publicadas
        </span>
        <span className="bg-[#5B34F2] text-white text-[11px] font-medium px-3 py-0.5 rounded-full">
          {activeCount} activas
        </span>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por título o área..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 h-9 border border-gray-200 rounded-lg px-3 text-sm text-[#1C1C1C] bg-white outline-none focus:border-[#5B34F2] transition-colors"
        />
        <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#5F6368] hover:bg-gray-100 transition-colors">
          ⚙ Filtrar
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-center py-10 text-sm text-[#5F6368]">
            No se encontraron ofertas.
          </p>
        )}

        {filtered.map(offer => {
          const st = STATUS_CONFIG[offer.status] ?? STATUS_CONFIG.publicada;
          return (
            <div
              key={offer.id}
              className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-col gap-2 hover:shadow-sm transition-shadow"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-[#1C1C1C] leading-snug">
                  {offer.title}
                </span>
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${st.className}`}>
                  {st.label}
                </span>
              </div>

              {/* Meta */}
              <div className="flex gap-3 flex-wrap">
                <span className="text-[11px] text-[#5F6368]">📍 {offer.location || "Remoto"}</span>
                <span className="text-[11px] text-[#5F6368]">💼 {offer.job_type || "Tiempo completo"}</span>
                <span className="text-[11px] text-[#5F6368]">💵 {offer.salary_range || "No especificado"}</span>
                <span className="text-[11px] text-[#5F6368]">📅 {getPublishedText(offer.created_at)}</span>
              </div>

              {/* Skills */}
              {offer.skills && offer.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 border-t border-gray-50 pt-2">
                  {offer.skills.map(skill => (
                    <span key={skill.id} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded">
                      {skill.name} • <span className="text-gray-500 font-normal">{skill.level}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
                <span className="text-xs text-[#5F6368]">
                  <strong className="text-[#5B34F2]">{offer.applicants_count || 0}</strong> postulantes
                </span>
                <div className="flex gap-2">
                  {offer.status !== "terminada" && offer.status !== "closed" ? (
                    <button
                      onClick={() => onEdit(offer)}
                      className="h-7 px-3 rounded-md border border-gray-200 bg-white text-xs text-[#5F6368] hover:bg-gray-100 transition-colors"
                    >
                      ✏ Editar
                    </button>
                  ) : (
                    <button className="h-7 px-3 rounded-md border border-gray-200 bg-white text-xs text-[#5F6368] hover:bg-gray-100 transition-colors">
                      ⧉ Duplicar
                    </button>
                  )}
                  <button
                    onClick={() => onDeletePick(offer)}
                    className="h-7 px-3 rounded-md bg-[#F25F63] text-xs text-white hover:bg-[#d94f53] transition-colors"
                  >
                    🗑 Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OffersList;
