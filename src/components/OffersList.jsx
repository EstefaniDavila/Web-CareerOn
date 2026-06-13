import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_OFFERS = [
  { id: 1, title: "Desarrollador Frontend React", location: "Arequipa, PE", type: "Tiempo completo", publishedAt: "Hace 2 días", status: "active", applicants: 12 },
  { id: 2, title: "Diseñador UX/UI Senior", location: "Remoto", type: "Medio tiempo", publishedAt: "Hace 5 días", status: "active", applicants: 8 },
  { id: 3, title: "Analista de Datos Jr.", location: "Lima, PE", type: "Tiempo completo", publishedAt: "Hace 10 días", status: "paused", applicants: 3 },
  { id: 4, title: "Backend Engineer Node.js", location: "Remoto", type: "Tiempo completo", publishedAt: "Hace 3 días", status: "closed", applicants: 21 },
];

const STATUS_CONFIG = {
  active: { label: "Activa",  className: "s-active" },
  paused: { label: "Pausada", className: "s-paused" },
  closed: { label: "Cerrada", className: "s-closed" },
};

const OffersList = ({ onEdit, onDeletePick }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = MOCK_OFFERS.filter(o =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = MOCK_OFFERS.filter(o => o.status === "active").length;

  return (
    <>
      <div className="panel-header">
        <span className="panel-title">Mis ofertas publicadas</span>
        <span className="badge-count">{activeCount} activas</span>
      </div>

      <div className="search-row">
        <input
          className="search-input"
          placeholder="Buscar por título o área..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn">⚙ Filtrar</button>
      </div>

      <div className="offers-list">
        {filtered.length === 0 && (
          <div className="offers-empty">No se encontraron ofertas.</div>
        )}
        {filtered.map(offer => {
          const st = STATUS_CONFIG[offer.status] ?? STATUS_CONFIG.active;
          return (
            <div key={offer.id} className="offer-card">
              <div className="offer-card-top">
                <span className="offer-title">{offer.title}</span>
                <span className={`status-pill ${st.className}`}>{st.label}</span>
              </div>
              <div className="offer-meta">
                <span className="meta-item">📍 {offer.location}</span>
                <span className="meta-item">💼 {offer.type}</span>
                <span className="meta-item">📅 {offer.publishedAt}</span>
              </div>
              <div className="offer-footer">
                <span className="apps-count">
                  <strong>{offer.applicants}</strong> postulantes
                </span>
                <div className="action-btns">
                  {offer.status !== "closed" ? (
                    <button className="btn btn-sm" onClick={() => onEdit(offer)}>
                      ✏ Editar
                    </button>
                  ) : (
                    <button className="btn btn-sm">⧉ Duplicar</button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDeletePick(offer)}
                  >
                    🗑 Eliminar
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      navigate(`/offers/${offer.id}`, {
                        state: {
                          offer,
                        },
                      })
                    }
                  >
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
