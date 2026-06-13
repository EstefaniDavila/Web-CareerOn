// ─── Offers.jsx ──────────────────────────────────────────────────────────────
import { useState } from "react";
import OffersLeftMenu from "../../components/OffersLeftMenu";
import OffersRightPanel from "../../components/OffersRightPanel";

export default function Offers() {
  const [view, setView] = useState("list");
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setView("edit");
  };

  const handleDeletePick = (offer) => {
    setSelectedOffer(offer);
    setView("delete-confirm");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-6 w-full items-start">
        <OffersLeftMenu activeView={view} onViewChange={setView} />
        <OffersRightPanel
          view={view}
          selectedOffer={selectedOffer}
          onViewChange={setView}
          onEdit={handleEdit}
          onDeletePick={handleDeletePick}
        />
      </div>
    </div>
  );
}


// ─── OffersLeftMenu.jsx ───────────────────────────────────────────────────────
import React from "react";
import { useMsal } from "@azure/msal-react";

const NAV_ITEMS = [
  { view: "list",   icon: "㗊", label: "Ver ofertas"   },
  { view: "create", icon: "＋", label: "Crear oferta"  },
  { view: "edit",   icon: "✏", label: "Editar oferta" },
  { view: "stats",  icon: "📊", label: "Estadísticas"  },
  { view: "config", icon: "⚙", label: "Configuración" },
];

const OffersLeftMenu = ({ activeView, onViewChange }) => {
  const { accounts } = useMsal();
  const userName = accounts[0]?.name || "Estudiante";
  const initials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="w-56 flex-shrink-0 bg-[#F3F3F3] rounded-xl p-4">
      <ul className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ view, icon, label }) => (
          <li
            key={view}
            onClick={() => onViewChange(view)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
              activeView === view
                ? "bg-[#5B34F2] text-white font-medium"
                : "text-[#5F6368] hover:bg-gray-200"
            }`}
          >
            <span>{icon}</span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OffersLeftMenu;
