import React from 'react';
import './RecruiterCentral.css';

const RecruiterCentral = () => {
  return (
    <div className="recruiter-central">
      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="glass-card metric-card">
          <span className="metric-value">47</span>
          <span className="metric-label">Total postulantes</span>
        </div>
        <div className="glass-card metric-card">
          <span className="metric-value highlight-purple">12</span>
          <span className="metric-label">Match IA alto</span>
        </div>
        <div className="glass-card metric-card">
          <span className="metric-value">4</span>
          <span className="metric-label">En entrevista</span>
        </div>
        <div className="glass-card metric-card">
          <span className="metric-value">284</span>
          <span className="metric-label">Vistas de oferta</span>
        </div>
      </div>

      {/* Ofertas Publicadas Card */}
      <div className="glass-card jobs-published-card">
        <div className="card-header-flex">
          <h3>OFERTAS PUBLICADAS</h3>
          <button className="add-offer-btn">+ Nueva oferta</button>
        </div>

        <div className="jobs-list">
          {/* Job 1 */}
          <div className="job-card border-accent-teal">
            <div className="job-icon-container tech-bg">
              <span className="job-icon">{'</>'}</span>
            </div>
            <div className="job-details">
              <h4>Desarrollador React Senior</h4>
              <p className="job-meta">Lima · Presencial · S/. 3,500 - 5,000</p>
            </div>
            <div className="job-stats-badge">
              <span className="applicant-count"><strong>23</strong> postulantes</span>
              <span className="status-badge active-badge">Activa</span>
            </div>
          </div>

          {/* Job 2 */}
          <div className="job-card border-accent-teal">
            <div className="job-icon-container data-bg">
              <span className="job-icon">📊</span>
            </div>
            <div className="job-details">
              <h4>Analista de Datos Jr.</h4>
              <p className="job-meta">Lima · Híbrido · S/. 2,200 - 3,000</p>
            </div>
            <div className="job-stats-badge">
              <span className="applicant-count"><strong>18</strong> postulantes</span>
              <span className="status-badge active-badge">Activa</span>
            </div>
          </div>

          {/* Job 3 */}
          <div className="job-card border-accent-teal">
            <div className="job-icon-container design-bg">
              <span className="job-icon">📱</span>
            </div>
            <div className="job-details">
              <h4>Diseñador UX/UI</h4>
              <p className="job-meta">Remoto · S/. 2,500</p>
            </div>
            <div className="job-stats-badge">
              <span className="applicant-count"><strong>6</strong> postulantes</span>
              <span className="status-badge paused-badge">Pausada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Reciente Card dd*/}
      <div className="glass-card recent-activity-card">
        <h3>ACTIVIDAD RECIENTE</h3>

        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-dot dot-purple"></div>
            <div className="activity-info">
              <p className="activity-text"><strong>Carlos M.</strong> postuló a <strong>Dev React Senior</strong></p>
              <span className="activity-time">hace 10 min</span>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot dot-teal"></div>
            <div className="activity-info">
              <p className="activity-text">La IA encontró <strong>3 nuevos matches</strong> para <strong>Analista Datos</strong></p>
              <span className="activity-time">hace 1 h</span>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot dot-red"></div>
            <div className="activity-info">
              <p className="activity-text"><strong>Valeria R.</strong> completó simulación de entrevista</p>
              <span className="activity-time">hace 3 h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCentral;
