import React from 'react';
import { useMsal } from "@azure/msal-react";
import './LeftSidebar.css';

const LeftSidebar = () => {
  const { accounts } = useMsal();
  
  const userName = accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="left-sidebar">
      {/* Profile Card */}
      <div className="glass-card profile-summary-card">
        <div className="profile-banner"></div>
        <div className="profile-avatar">{initials}</div>
        
        <div className="profile-info">
          <h2>{userName}</h2>
          <p>Software Developer · UTP</p>
          <span className="badge-utp">✦ Estudiante 9no Ciclo</span>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">248</span>
            <span className="stat-label">Visitas perfil</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">Ofertas activas</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">94%</span>
            <span className="stat-label">Match IA</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">3</span>
            <span className="stat-label">Entrevistas</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="glass-card nav-menu-card">
        <ul className="side-nav-list">
          <li className="active">
            <span className="icon">㗊</span> Panel principal
          </li>
          <li>
            <span className="icon">👤</span> Mi perfil
          </li>
          <li>
            <span className="icon">☆</span> Favoritos
          </li>
          <li>
            <span className="icon">📅</span> Eventos UTP
          </li>
          <li>
            <span className="icon">📊</span> Estadísticas
          </li>
          <li>
            <span className="icon">⚙</span> Configuración
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
