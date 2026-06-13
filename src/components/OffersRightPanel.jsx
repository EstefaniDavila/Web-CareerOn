import React, { useState } from 'react';
import './OffersRightPanel.css';

const statusConfig = {
  active:  { label: 'Activa',  className: 'status-active' },
  paused:  { label: 'Pausada', className: 'status-paused' },
  closed:  { label: 'Cerrada', className: 'status-closed' },
};

const OffersRightPanel = ({ offers = [] }) => {
  const [search, setSearch] = useState('');

  const filtered = offers.filter(o =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = offers.filter(o => o.status === 'active').length;

  return (
    <div className="offers-right-panel">
      <div className="panel-header">
        <span className="panel-title">Mis ofertas publicadas</span>
        <span className="offers-badge">{activeCount} activas</span>
      </div>

      <div className="search-row">
        <input
          className="offers-search"
          placeholder="Buscar por título o área..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="offers-filter-btn">
          ⚙ Filtrar
        </button>
        <button className="offers-new-btn">
          + Nueva
        </button>
      </div>

      <div className="offers-list">
        {filtered.length === 0 && (
          <div className="offers-empty">No se encontraron ofertas.</div>
        )}
        {filtered.map(offer => {
          const st = statusConfig[offer.status] ?? statusConfig.active;
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
                  {offer.status !== 'closed'
                    ? <button className="action-btn">✏ Editar</button>
                    : <button className="action-btn">⧉ Duplicar</button>
                  }
                  <button className="action-btn primary">👁 Ver</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OffersRightPanel;