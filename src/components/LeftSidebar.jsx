import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation } from 'react-router-dom';
import useCrud from '../hooks/useCrud';
import './LeftSidebar.css';

let cachedStudentData = null;
let lastFetchTime = 0;

const LeftSidebar = () => {
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();
  const [studentData, setStudentData] = useState(cachedStudentData);

  const { getModel } = useCrud('/api/student/profile');

  useEffect(() => {
    const fetchProfile = async () => {
      if (cachedStudentData && Date.now() - lastFetchTime < 60000) {
        setStudentData(cachedStudentData);
        return;
      }
      try {
        const result = await getModel();
        if (result?.data?.user) {
          cachedStudentData = result.data.user;
          lastFetchTime = Date.now();
          setStudentData(result.data.user);
        }
      } catch (err) {
        console.error('Error fetching student profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const userName = studentData?.name || accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();
  const career = studentData?.career || "Software Developer";
  const semester = studentData?.semester ? `Estudiante ${studentData.semester}vo Ciclo` : "Estudiante UTP";

  const applicationsCount = studentData?.applications_count !== undefined ? studentData.applications_count : 0;
  const coins = studentData?.coins !== undefined ? studentData.coins : 0;
  const interviewsCount = studentData?.interviews_count !== undefined ? studentData.interviews_count : 0;

  return (
    <div className="left-sidebar">
      {/* Profile Card */}
      <div className="glass-card profile-summary-card">
        <div className="profile-banner student-banner"></div>
        <div className="profile-avatar student-avatar">{initials}</div>

        <div className="profile-info">
          <h2>{userName}</h2>
          <p>{career} · UTP</p>
          <span className="badge-utp student-badge">✦ {semester}</span>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value text-yellow-500 font-bold">{coins}</span>
            <span className="stat-label">Monedas</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">{applicationsCount}</span>
            <span className="stat-label">Postulaciones</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{interviewsCount}</span>
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
          <li className={location.pathname === '/challenge' ? 'active' : ''} onClick={() => navigate('/challenge')}>
            <span className="icon">🏆</span> Mis Misiones
          </li>
          <li className={location.pathname === '/profile' ? 'active' : ''} onClick={() => navigate('/profile')}>
            <span className="icon">👤</span> Mi perfil
          </li>
          <li className={location.pathname === '/favorites' ? 'active' : ''} onClick={() => navigate('/favorites')}>
            <span className="icon">☆</span> Favoritos
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
