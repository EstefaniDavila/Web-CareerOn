import React, { useState, useEffect } from "react";
import useCrud from "../hooks/useCrud";

const STATUS_CONFIG = {
  true:  { label: "Activa",  className: "bg-emerald-50 text-emerald-800" },
  false: { label: "Cerrada", className: "bg-red-50 text-red-800" },
};

const JOB_TYPE_LABELS = {
  full_time:  "Tiempo completo",
  part_time:  "Medio tiempo",
  contract:   "Contrato",
  internship: "Prácticas",
  remote:     "Remoto",
};

const OffersList = ({ onEdit, onDeletePick }) => {
  const [search, setSearch] = useState("");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getModel } = useCrud("/api/recruiter/jobs");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const data = await getModel();
        setOffers(data.jobs ?? []);
        console.log("OFFERS STATE:", data.jobs?.length); // 👈
      } catch (err) {
        setError("No se pudieron cargar las ofertas.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const filtered = offers.filter(o =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = offers.filter(o => o.is_active).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
    if (diff === 0) return "Hoy";
    if (diff === 1) return "Hace 1 día";
    return `Hace ${diff} días`;
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 px-4 py-3 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-sm text-red-500">{error}</p>
    );
  }
  console.log("FILTERED:", filtered.length, "SEARCH:", search); // 👈
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
          const st = STATUS_CONFIG[String(offer.is_active)] ?? STATUS_CONFIG["false"];
          const jobTypeLabel = JOB_TYPE_LABELS[offer.job_type] ?? offer.job_type ?? "—";

          return (
            <div
              key={offer.id}
              className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-col gap-2"
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
                {offer.location && (
                  <span className="text-[11px] text-[#5F6368]">📍 {offer.location}</span>
                )}
                {offer.job_type && (
                  <span className="text-[11px] text-[#5F6368]">💼 {jobTypeLabel}</span>
                )}
                {offer.salary_range && (
                  <span className="text-[11px] text-[#5F6368]">💰 {offer.salary_range}</span>
                )}
                <span className="text-[11px] text-[#5F6368]">📅 {formatDate(offer.created_at)}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-[#5F6368]">
                  <strong className="text-[#5B34F2]">{offer.applicants_count}</strong> postulantes
                </span>
                <div className="flex gap-2">
                  {offer.is_active ? (
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
                  <button className="h-7 px-3 rounded-md bg-[#5B34F2] text-xs text-white hover:bg-[#4320C9] transition-colors">
                    👁 Ver
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
