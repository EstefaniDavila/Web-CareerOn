import React from 'react';
import './FeedCentral.css';

const FeedCentral = () => {
  return (
    <div className="feed-central">
      {/* Create Post Input */}
      <div className="glass-card create-post-card">
        <div className="create-post-input">
          <div className="profile-avatar-small">ES</div>
          <input type="text" placeholder="Publica un concurso, logro o novedad..." />
        </div>
        <div className="create-post-actions">
          <button className="action-btn"><span className="icon">🖼️</span> Foto</button>
          <button className="action-btn"><span className="icon">🎥</span> Vídeo</button>
          <button className="action-btn"><span className="icon">🏆</span> Concurso</button>
        </div>
      </div>

      {/* Feed Filters */}
      <div className="feed-filters">
        <button className="filter-btn active">Todo</button>
        <button className="filter-btn">Empleabilidad UTP</button>
      </div>

      {/* Post 1: UTP */}
      <div className="glass-card post-card">
        <div className="post-header">
          <div className="post-avatar utp-bg">UTP</div>
          <div className="post-info">
            <h4 className="post-author">Empleabilidad UTP <span className="verified-badge">Oficial</span></h4>
            <p className="post-meta">Universidad Tecnológica del Perú</p>
            <p className="post-time">Hace 2 horas · 🌐</p>
          </div>
        </div>
        <div className="post-content">
          <div className="post-banner hackathon-banner">
            🏆 CONVOCATORIA<br/>Hackathon CareerOn 2026
          </div>
          <p>¡Inscripciones abiertas para el Hackathon de Empleabilidad 2026! Equipos de 3-5 personas. Premios en efectivo y pasantías garantizadas con empresas partner.</p>
          <div className="post-highlight">
            <p>📅 Fecha límite: 30 de junio</p>
            <p>🏅 Premio: S/. 5,000 + pasantía</p>
          </div>
        </div>
        <div className="post-stats">
          <span>❤️ 128 reacciones</span>
          <span>💬 34 comentarios</span>
          <span>↗️ 22 veces compartido</span>
        </div>
        <div className="post-actions">
          <button className="action-btn">👍 Recomendar</button>
          <button className="action-btn">💬 Comentar</button>
          <button className="action-btn">🔗 Compartir</button>
        </div>
      </div>

      {/* Post 2: Yape */}
      <div className="glass-card post-card">
        <div className="post-header">
          <div className="post-avatar yape-bg">🏦</div>
          <div className="post-info">
            <h4 className="post-author">Yape Perú <span className="empresa-badge">Empresa</span></h4>
            <p className="post-meta">Fintech · Lima, Perú</p>
            <p className="post-time">Hace 1 día</p>
          </div>
        </div>
        <div className="post-content">
          <p>Seguimos creciendo. Buscamos <strong>3 desarrolladores React</strong> con experiencia en sistemas de pago. Ideal para egresados UTP con perfil IA.</p>
        </div>
        <div className="post-stats">
          <span>❤️ 56 reacciones</span>
          <span>💬 12 comentarios</span>
        </div>
        <div className="post-actions">
          <button className="action-btn">👍 Recomendar</button>
          <button className="action-btn">💬 Comentar</button>
          <button className="action-btn">🔗 Compartir</button>
        </div>
      </div>

    </div>
  );
};

export default FeedCentral;
