import React, { useState } from "react";

const MOCK_OFFERS = [
  { id: 1, title: "Desarrollador Frontend React", location: "Arequipa, PE", type: "Tiempo completo", publishedAt: "Hace 2 días", status: "active", applicants: 12 },
  { id: 2, title: "Diseñador UX/UI Senior", location: "Remoto", type: "Medio tiempo", publishedAt: "Hace 5 días", status: "active", applicants: 8 },
  { id: 3, title: "Analista de Datos Jr.", location: "Lima, PE", type: "Tiempo completo", publishedAt: "Hace 10 días", status: "paused", applicants: 3 },
  { id: 4, title: "Backend Engineer Node.js", location: "Remoto", type: "Tiempo completo", publishedAt: "Hace 3 días", status: "closed", applicants: 21 },
];

const STATUS_CONFIG = {
  active: { label: "Activa",  className: "bg-emerald-50 text-emerald-800" },
  paused: { label: "Pausada", className: "bg-amber-50 text-amber-800" },
  closed: { label: "Cerrada", className: "bg-red-50 text-red-800" },
};

const OffersList = ({ onEdit, onDeletePick }) => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_OFFERS.filter(o =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = MOCK_OFFERS.filter(o => o.status === "active").length;

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
          const st = STATUS_CONFIG[offer.status] ?? STATUS_CONFIG.active;
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
                <span className="text-[11px] text-[#5F6368]">📍 {offer.location}</span>
                <span className="text-[11px] text-[#5F6368]">💼 {offer.type}</span>
                <span className="text-[11px] text-[#5F6368]">📅 {offer.publishedAt}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-[#5F6368]">
                  <strong className="text-[#5B34F2]">{offer.applicants}</strong> postulantes
                </span>
                <div className="flex gap-2">
                  {offer.status !== "closed" ? (
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
