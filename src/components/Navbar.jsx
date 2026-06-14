import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar tipo de usuario
  let userType = 'Student';
  try {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    userType = userData?.type || 'Student';
  } catch (e) { }

  const profileRoute = userType === 'Empresa' ? '/recruiter/profile' : '/profile';

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
        <div className="navbar-links hidden lg:flex">
          <div className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>Inicio</span>
          </div>
          <div className={`nav-item ${location.pathname === '/applications' ? 'active' : ''}`} onClick={() => navigate('/applications')} style={{ cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>Mis Postulaciones</span>
          </div>
          <div className={`nav-item ${location.pathname === '/challenge' ? 'active' : ''}`} onClick={() => navigate('/challenge')} style={{ cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            <span>Mis Misiones</span>
          </div>
          <div className={`nav-item ${location.pathname === '/favorites' ? 'active' : ''}`} onClick={() => navigate('/favorites')} style={{ cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>Favoritos</span>
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
              <button className="dropdown-item" onClick={() => navigate(profileRoute)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Mi perfil
              </button>
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
