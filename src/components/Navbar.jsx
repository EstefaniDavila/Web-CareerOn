import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("mock_token");
    localStorage.removeItem("user_data");
    window.location.href = "/";
  };

  const userName = "Estudiante";
  const userEmail = "";
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-career">Career</span>
          <span className="logo-on">On</span>
        </div>

        {/* Navigation Items */}
        <div className="navbar-links">
          <div className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>Inicio</span>
          </div>
          <div className={`nav-item ${location.pathname === '/stats' ? 'active' : ''}`} onClick={() => navigate('/stats')} style={{cursor: 'pointer'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
            <span>Estadísticas</span>
          </div>
          <div className="nav-item" onClick={() => navigate('/explorar')} style={{cursor: 'pointer'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            <span>Empleos</span>
          </div>
          <div className="nav-item">
            <div className="badge">5</div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span>Alertas</span>
          </div>
        </div>

        {/* Profile Circle & Dropdown */}
        <div className="navbar-profile" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="profile-name hidden md:block text-sm font-bold text-gray-700 mr-3">{userName}</span>
          <div className="profile-circle">{initials}</div>
          
          {menuOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <strong>{userName}</strong>
                <p>{userEmail}</p>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-btn" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
