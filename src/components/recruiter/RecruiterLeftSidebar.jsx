import React from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { useUserStatus } from "../../hooks/useUserStatus";
import './RecruiterLeftSidebar.css';

const RecruiterLeftSidebar = () => {
  const { accounts } = useMsal();
  const { userData } = useUserStatus();
  const navigate = useNavigate();

  const companyName = userData?.company_name || "Yape Perú";
  const initials = companyName ? companyName.substring(0, 2).toUpperCase() : "YP";

  return (
    <div className="recruiter-left-sidebar">
      {/* Profile Card */}
      <div className="glass-card profile-summary-card">
        <div className="profile-banner"></div>
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info">
          <h2>{companyName}</h2>
          <p>Fintech · Lima, Perú</p>
          <span className="badge-utp-partner">✦ Partner UTP</span>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">3</span>
            <span className="stat-label">Ofertas activas</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">47</span>
            <span className="stat-label">Postulantes</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">4</span>
            <span className="stat-label">En proceso</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="glass-card nav-menu-card">
        <p className="menu-header">MENÚ</p>
        <ul className="side-nav-list">
          <li className="active">
            <span className="icon">㗊</span> Resumen
          </li>
          <li className="has-badge">
            <div className="nav-label-container">
              <span className="icon">👥</span> Candidatos
            </div>
            <span className="nav-badge">47</span>
          </li>
          <li onClick={() => navigate('/offers')} style={{ cursor: 'pointer' }}>
            <span className="icon">➕</span> Nueva oferta
          </li>
          <li>
            <span className="icon">✨</span> Matchmaking IA
          </li>
          <li>
            <span className="icon">📊</span> Estadísticas
          </li>
          <li>
            <span className="icon">🏢</span> Perfil empresa
          </li>
          <li>
            <span className="icon">⚙️</span> Configuración
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecruiterLeftSidebar;