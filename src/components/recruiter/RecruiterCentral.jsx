import React from 'react';
import './RecruiterCentral.css';

const RecruiterCentral = () => {
  return (
    <div className="recruiter-central">

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
