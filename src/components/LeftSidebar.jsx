import React from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation } from 'react-router-dom';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userName = accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="left-sidebar">
      {/* Profile Card */}
      <div className="glass-card profile-summary-card">
        <div className="profile-banner student-banner"></div>
        <div className="profile-avatar student-avatar">{initials}</div>
        
        <div className="profile-info">
          <h2>{userName}</h2>
          <p>Software Developer · UTP</p>
          <span className="badge-utp student-badge">✦ Estudiante 9no Ciclo</span>
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

      <div className="glass-card nav-menu-card">
        <ul className="side-nav-list">
          <li className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')}>
            <span className="icon">㗊</span> Panel principal
          </li>
          <li className={location.pathname === '/applications' ? 'active' : ''} onClick={() => navigate('/applications')}>
            <span className="icon">📝</span> Mis Postulaciones
          </li>
          <li>
            <span className="icon">💬</span> Mensajes <span className="notification-badge">2</span>
          </li>
          <li className={location.pathname === '/profile' ? 'active' : ''} onClick={() => navigate('/profile')}>
            <span className="icon">👤</span> Mi perfil
          </li>
          <li className={location.pathname === '/favorites' ? 'active' : ''} onClick={() => navigate('/favorites')}>
            <span className="icon">☆</span> Favoritos
          </li>
          <li className={location.pathname === '/events' ? 'active' : ''} onClick={() => navigate('/events')}>
            <span className="icon">📅</span> Eventos UTP
          </li>
          <li className={location.pathname === '/stats' ? 'active' : ''} onClick={() => navigate('/stats')}>
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
