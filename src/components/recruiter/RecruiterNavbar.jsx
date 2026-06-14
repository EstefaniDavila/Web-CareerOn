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

  const initials = companyName ? companyName.substring(0, 2).toUpperCase() : "YP";

  return (
    <nav className="recruiter-navbar">
      <div className="recruiter-navbar-content">

        {/* Logo */}
        <div className="recruiter-navbar-logo" onClick={() => navigate('/recruiter/dashboard')} style={{ cursor: 'pointer' }}>
          <span className="logo-career">Career</span>
          <span className="logo-on">On</span>
          <span className="logo-badge-recruiter">Recruiter</span>
        </div>

        <div className="recruiter-navbar-profile" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ marginRight: '10px', fontSize: '14px', fontWeight: '600', color: '#1C1C1C' }}>{companyName}</span>
          <div className="profile-circle">{initials}</div>

          {menuOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <strong>{companyName}</strong>
                <p>{userEmail}</p>
              </div>
              <button className="dropdown-item" onClick={() => navigate('/recruiter/profile')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </button>
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
