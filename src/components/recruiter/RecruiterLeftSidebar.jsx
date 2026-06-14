import React, { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStatus } from "../../hooks/useUserStatus";
import useCrud from "../../hooks/useCrud";
import './RecruiterLeftSidebar.css';

const RecruiterLeftSidebar = () => {
  const { accounts } = useMsal();
  const { userData } = useUserStatus();
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para datos del backend
  const [dashboardData, setDashboardData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inicializar hooks de CRUD
  const { getModel: getDashboard } = useCrud('/api/recruiter/dashboard');
  const { getModel: getJobs } = useCrud('/api/recruiter/jobs');

  // Datos de la empresa desde el backend o userData
  const companyName = dashboardData?.recruiter_info?.company_name || userData?.company_name || "Mi Empresa";
  const initials = companyName ? companyName.substring(0, 2).toUpperCase() : "ME";
  const tokens = dashboardData?.recruiter_info?.tokens_available || 0;

  // Cargar datos al montar el componente
  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener dashboard y trabajos en paralelo
        const [dashboard, jobsList] = await Promise.all([
          getDashboard().catch(err => {
            console.warn('Error al obtener dashboard:', err);
            return null;
          }),
          getJobs().catch(err => {
            console.warn('Error al obtener trabajos:', err);
            return [];
          })
        ]);

        if (dashboard) {
          console.log('📦 DATOS RECIBIDOS:', dashboard);
          console.log('🏢 Empresa:', dashboard?.recruiter_info?.company_name);
          console.log('🪙 Tokens:', dashboard?.recruiter_info?.tokens_available);
          setDashboardData(dashboard);
        }

        if (dashboard) {
          setDashboardData(dashboard);
        }

        if (jobsList && Array.isArray(jobsList)) {
          setJobs(jobsList);
        }

      } catch (err) {
        console.error('Error al cargar datos del reclutador:', err);
        setError('No se pudieron cargar los datos. Verifica tu conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, []);

  // Calcular estadísticas desde los datos del backend
  const activeOffers = dashboardData?.active_jobs_count || jobs.length || 0;
  const totalApplicants = dashboardData?.total_applicants || 0;
  const inProcess = dashboardData?.in_process_count || 0;

  // Si está cargando, muestra estado de carga
  if (loading) {
    return (
      <div className="recruiter-left-sidebar">
        <div className="glass-card profile-summary-card">
          <div className="profile-banner"></div>
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <h2>{companyName}</h2>
            <p>Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }//----

  return (
    <div className="recruiter-left-sidebar">
      {/* Profile Card */}
      <div className="glass-card profile-summary-card">
        <div className="profile-banner"></div>
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info">
          <h2>{companyName}</h2>
          <p>
            Fintech · Lima, Perú
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="badge-utp-partner">✦ Partner UTP</span>
            <span className="badge-utp-partner" style={{ backgroundColor: '#FFD700', color: '#B8860B', border: '1px solid #FFE4B5' }}>
              🪙 {tokens} Monedas
            </span>
          </div>
        </div>

        {/* Estadísticas desde el backend */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{activeOffers}</span>
            <span className="stat-label">Ofertas activas</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalApplicants}</span>
            <span className="stat-label">Postulantes</span>
          </div>
          <div className="stat-item highlight">
            <span className="stat-value">{inProcess}</span>
            <span className="stat-label">En proceso</span>
          </div>
        </div>

        {/* Mostrar error si hay */}
        {error && (
          <div className="error-message" style={{ fontSize: '12px', color: '#ff6b6b', marginTop: '10px', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}
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
            <span className="nav-badge">{totalApplicants}</span>
          </li>
          <li onClick={() => navigate('/offers')} style={{ cursor: 'pointer' }}>
            <span className="icon">➕</span> Nueva oferta
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecruiterLeftSidebar;