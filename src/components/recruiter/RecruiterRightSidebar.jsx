import React from 'react';
import './RecruiterRightSidebar.css';

const RecruiterRightSidebar = () => {
  return (
    <div className="recruiter-right-sidebar">
      {/* Quick Action Buttons */}
      <div className="quick-actions-container">
        <button className="quick-action-btn talent-search-btn">
          <span className="action-icon">✨</span>
          <div className="action-text-layout">
            <span className="action-title">Buscar talento con IA</span>
            <span className="action-subtitle">Matchmaking automático UTP</span>
          </div>
        </button>
      </div>
      {/* Insight IA Card */}
      <div className="insight-ia-card">
        <div className="insight-header">
          <span className="insight-icon">✨</span>
          <h4>Insight IA</h4>
        </div>
        <p className="insight-body">
          <strong>Carlos Mendoza</strong> completó una simulación de entrevista técnica con puntaje <strong>9.2/10</strong> para el puesto de React. Es tu candidato más fuerte esta semana.
        </p>
        <button className="insight-cta-btn">Ver análisis completo →</button>
      </div>
    </div>
  );
};

export default RecruiterRightSidebar;
