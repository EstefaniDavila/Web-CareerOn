import React, { useEffect, useState } from 'react';
import './RecruiterRightSidebar.css';
import useCrud from "../../hooks/useCrud";

const RecruiterRightSidebar = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { getModel: getDashboard } = useCrud('/api/recruiter/dashboard');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboard = await getDashboard();
        if (dashboard) {
          setDashboardData(dashboard);
        }
      } catch (error) {
        console.error('Error fetching dashboard data for right sidebar:', error);
      }
    };
    fetchData();
  }, []);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'hace un momento';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours} h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays} d`;
  };

  const recentActivities = dashboardData?.recent_activities || [];
  const iaInsight = dashboardData?.ia_insight;
  const dotColors = ['dot-purple', 'dot-teal', 'dot-red'];
  return (
    <div className="recruiter-right-sidebar">
      <div className="glass-card recent-activity-card">
        <h3 className="section-title">ACTIVIDAD RECIENTE</h3>

        <div className="activity-list">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div className="activity-item" key={activity.id}>
                <div className={`activity-dot ${dotColors[index % dotColors.length]}`}></div>
                <div className="activity-info">
                  <p className="activity-text"><strong>{activity.student_name}</strong> postuló a <strong>{activity.job_title}</strong></p>
                  <span className="activity-time">{formatTimeAgo(activity.created_at)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No hay actividad reciente.</p>
          )}
        </div>
      </div>
      
      {iaInsight && (
        <div className="insight-ia-card">
          <div className="insight-header">
            <span className="insight-icon">✨</span>
            <h4>{iaInsight.title}</h4>
          </div>
          <p className="insight-body">
            {iaInsight.message.split('**').map((text, i) => (
              i % 2 === 1 ? <strong key={i}>{text}</strong> : text
            ))}
          </p>
          <button className="insight-cta-btn">Ver análisis completo →</button>
        </div>
      )}
    </div>
  );
};

export default RecruiterRightSidebar;
