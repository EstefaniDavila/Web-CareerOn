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

      {/* Actividad Reciente Card */}
      <div className="glass-card recent-activity-card">
        <h3 className="section-title">ACTIVIDAD RECIENTE</h3>

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

      {/* Top Candidatos IA Card */}
      <div className="glass-card candidates-card">
        <h3 className="section-title">TOP CANDIDATOS IA</h3>
        
        <div className="candidates-list">
          {/* Candidate 1 */}
          <div className="candidate-item">
            <div className="candidate-header">
              <div className="candidate-avatar avatar-purple">CM</div>
              <div className="candidate-info">
                <h4>Carlos Mendoza</h4>
                <p>Ing. Software · UTP · 8vo ciclo</p>
              </div>
            </div>
            
            <div className="match-score-section">
              <div className="match-text-row">
                <span className="match-percentage">98% match</span>
              </div>
              <div className="match-progress-bar">
                <div className="match-progress-fill fill-purple" style={{ width: '98%' }}></div>
              </div>
            </div>

            <div className="candidate-actions">
              <button className="candidate-btn btn-secondary">Contactar</button>
              <button className="candidate-btn btn-primary-recruiter">Ver perfil</button>
            </div>
          </div>

          {/* Candidate 2 */}
          <div className="candidate-item">
            <div className="candidate-header">
              <div className="candidate-avatar avatar-teal">VR</div>
              <div className="candidate-info">
                <h4>Valeria Rios</h4>
                <p>Ing. Sistemas · UTP · Egresada</p>
              </div>
            </div>
            
            <div className="match-score-section">
              <div className="match-text-row">
                <span className="match-percentage">94% match</span>
              </div>
              <div className="match-progress-bar">
                <div className="match-progress-fill fill-teal" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div className="candidate-actions">
              <button className="candidate-btn btn-secondary">Contactar</button>
              <button className="candidate-btn btn-primary-recruiter">Ver perfil</button>
            </div>
          </div>

          {/* Candidate 3 */}
          <div className="candidate-item">
            <div className="candidate-header">
              <div className="candidate-avatar avatar-blue">JP</div>
              <div className="candidate-info">
                <h4>José Paredes</h4>
                <p>Ing. Software · UTP · 9no ciclo</p>
              </div>
            </div>
            
            <div className="match-score-section">
              <div className="match-text-row">
                <span className="match-percentage">88% match</span>
              </div>
              <div className="match-progress-bar">
                <div className="match-progress-fill fill-blue" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div className="candidate-actions">
              <button className="candidate-btn btn-secondary">Contactar</button>
              <button className="candidate-btn btn-primary-recruiter">Ver perfil</button>
            </div>
          </div>
        </div>
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
