import React from "react";
import "../Postulation/RecrutierPastulations.css";

const applicants = [
  {
    id: 1,
    name: "Carlos Mendoza",
    career: "Ing. Software - UTP",
    match: 98,
    skills: "React • Redux • Node.js",
    status: "Excelente",
  },
  {
    id: 2,
    name: "Valeria Ríos",
    career: "Ing. Sistemas - UTP",
    match: 94,
    skills: "React • Next.js • Tailwind",
    status: "Muy alto",
  },
  {
    id: 3,
    name: "José Paredes",
    career: "Ing. Informática",
    match: 88,
    skills: "React • Express • MongoDB",
    status: "Alto",
  },
  {
    id: 4,
    name: "Ana Torres",
    career: "Ing. Software",
    match: 82,
    skills: "Vue • Java • Spring",
    status: "Bueno",
  },
];

const RecruiterPostulations = () => {
  return (
    <div className="postulations-container">

      <div className="glass-card postulations-header">

        <div>
          <h2>Desarrollador React Senior</h2>
          <p>Lima · Presencial · S/. 3,500 - 5,000</p>
        </div>

        <div className="header-stats">
          <span>23 postulantes</span>
        </div>

      </div>

      <div className="glass-card filters-card">

        <input
          className="search-input"
          placeholder="Buscar postulante..."
        />

        <select className="filter-select">
          <option>Mayor Match</option>
          <option>Menor Match</option>
          <option>Nombre</option>
        </select>

      </div>

      <div className="applicants-list">

        {applicants.map((applicant) => (

          <div className="glass-card applicant-card" key={applicant.id}>

            <div className="avatar">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="applicant-info">

              <h3>{applicant.name}</h3>

              <p>{applicant.career}</p>

              <small>{applicant.skills}</small>

            </div>

            <div className="match-section">

              <div className="match-value">

                {applicant.match}%

              </div>

              <span className="match-label">
                {applicant.status}
              </span>

            </div>

            <div className="actions">

              <button className="secondary-btn">
                Ver perfil
              </button>

              <button className="primary-btn">
                Contactar
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecruiterPostulations;