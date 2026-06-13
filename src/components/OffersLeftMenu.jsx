import React from 'react';
import { useMsal } from "@azure/msal-react";
import './LeftSidebar.css';

const OffersLeftMenu = () => {
  const { accounts } = useMsal();
  
  const userName = accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="left-sidebar">
      {/* Navigation Menu */}
      <div className="glass-card nav-menu-card">
        <ul className="side-nav-list">
          <li className="active">
            <span className="icon">㗊</span> Ver Ofertas
          </li>
          <li>
            <span className="icon">👤</span> Crear Ofertas
          </li>
          <li>
            <span className="icon">☆</span> Eliminar Ofertas
          </li>
          <li>
            <span className="icon">📅</span> Editar Ofertas
          </li>
          <li>
            <span className="icon">📊</span> Webi Wabo
          </li>
          <li>
            <span className="icon">⚙</span> WASDASDA
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffersLeftMenu;
