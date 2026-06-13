import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import './LeftSidebar.css';

const LeftSidebar = () => {
  const { accounts } = useMsal();
  const [cvFileName, setCvFileName] = useState("curriculum_Fherdinan.pdf");
  const [cvFile, setCvFile] = useState(null);

  const userName = accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();

  // Seleción del archivo pdf CV
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
      setCvFileName(file.name);
    } else {
      alert("Por favor, selecciona un archivo PDF válido");
    }
  };

  // Cargar el archivo
  const handleChangeClick = () => {
    document.getElementById('cvFileInput').click();
  };

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

      {/* CV Upload Card */}
      <div className="glass-card cv-upload-card">
        <div className="cv-header">
          <span className="icon">📄</span>
          <h3>Mi CV</h3>
        </div>

        <div className="cv-file-info">
          <span className="file-name">{cvFileName}</span>
          <button
            className="btn-change-cv"
            onClick={handleChangeClick}
          >
            Cambiar
          </button>
        </div>

        <input
          type="file"
          accept="application/pdf"
          id="cvFileInput"
          className="cv-file-input"
          onChange={handleFileChange}
          hidden
        />

        <button className="btn-evaluate-cv">
          🤖 Evaluar CV con IA
        </button>

        <small className="cv-hint">
          La IA analizará tu CV y te dará feedback personalizado
        </small>
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