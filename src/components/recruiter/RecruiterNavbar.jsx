import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';
import { useUserStatus } from "../../hooks/useUserStatus";
import './RecruiterNavbar.css';

const RecruiterNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { instance, accounts } = useMsal();
  const { userData } = useUserStatus();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("mock_token");
    localStorage.removeItem("user_data");
    window.location.href = "/";
  };

  const companyName = userData?.company_name || "Yape Perú";
  const userEmail = accounts[0]?.username || "";
  
  // Use first 2 letters of company name as initials, default to "YP"
  const initials = companyName ? companyName.substring(0, 2).toUpperCase() : "YP";

  return (
    <nav className="recruiter-navbar">
      <div className="recruiter-navbar-content">
        
        {/* Logo */}
        <div className="recruiter-navbar-logo">
          <span className="logo-career">Career</span>
          <span className="logo-on">On</span>
          <span className="logo-badge-recruiter">Recruiter</span>
        </div>

        {/* Search Bar */}
        <div className="recruiter-navbar-search">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Buscar candidatos por habilidad, carrera..." />
        </div>

        {/* Navigation Items */}
        <div className="recruiter-navbar-links">
          <div className="nav-item active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Panel</span>
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Candidatos</span>
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Ofertas</span>
          </div>
          <div className="nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Mensajes</span>
          </div>
        </div>

        {/* Profile Circle & Dropdown */}
        <div className="recruiter-navbar-profile" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="profile-circle">{initials}</div>
          
          {menuOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <strong>{companyName}</strong>
                <p>{userEmail}</p>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-btn" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default RecruiterNavbar;
