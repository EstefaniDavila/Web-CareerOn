import React from "react";
import { useMsal } from "@azure/msal-react";
import "./LeftSidebar.css";

const NAV_ITEMS = [
  { view: "list",    icon: "㗊", label: "Ver ofertas"      },
  { view: "create",  icon: "＋", label: "Crear oferta"     }
];

const OffersLeftMenu = ({ activeView, onViewChange }) => {
  const { accounts } = useMsal();
  const userName = accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="left-sidebar">
      <div className="glass-card nav-menu-card">
        <ul className="side-nav-list">
          {NAV_ITEMS.map(({ view, icon, label }) => (
            <li
              key={view}
              className={activeView === view || (activeView === "delete-confirm" && view === "delete") ? "active" : ""}
              onClick={() => onViewChange(view === "delete" ? "delete-pick" : view)}
            >
              <span className="icon">{icon}</span> {label}
            </li>
          ))}
        </ul>
        <div>
          <img src="src/assets/ReclutadorPetPes.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default OffersLeftMenu;