import React from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      {/* Estadísticas Card */}
      <div className="glass-card stats-card">
        <h3 className="stats-title">Ver<br/><span className="highlight">estadísticas</span></h3>
        <p className="stats-subtitle">Rendimiento de ofertas</p>
      </div>

      {/* Matches Activos */}
      <div className="glass-card matches-card">
        <h3 className="section-title">MATCHES ACTIVOS</h3>
        
        <div className="match-item">
          <div className="match-icon tech">{'</>'}</div>
          <div className="match-info">
            <h4>Dev React · Yape</h4>
            <p>Lima · Presencial</p>
          </div>
          <div className="match-score">98%</div>
        </div>

        <div className="match-item">
          <div className="match-icon data">📊</div>
          <div className="match-info">
            <h4>Data Analyst · BCP</h4>
            <p>Lima · Híbrido</p>
          </div>
          <div className="match-score">91%</div>
        </div>

        <div className="match-item">
          <div className="match-icon mobile">📱</div>
          <div className="match-info">
            <h4>Flutter Dev · Rappi</h4>
            <p>Remoto</p>
          </div>
          <div className="match-score">87%</div>
        </div>
      </div>

      {/* CTA Simulador IA */}
      <div className="glass-card cta-card">
        <h3 className="cta-title">✦ Simular entrevista IA</h3>
        <p className="cta-text">Practica con Gemini antes de tu próxima entrevista técnica. Personalizado a la oferta que elijas.</p>
        <button className="btn-primary student-btn cta-btn">Comenzar ahora →</button>
      </div>
    </div>
  );
};

export default RightSidebar;
