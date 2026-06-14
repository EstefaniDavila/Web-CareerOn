import React from "react";
import { useMsal } from "@azure/msal-react";

const NAV_ITEMS = [
  { view: "list",   icon: "㗊", label: "Ver ofertas"   },
  { view: "create", icon: "＋", label: "Crear oferta"  },
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
                ? "bg-[#1C6B72] text-white font-medium"
                : "text-[#5F6368] hover:bg-gray-200"
            }`}
          >
            <span>{icon}</span>
            {label}
          </li>
        ))}
        <li>
          <img src="/src/assets/ReclutadorPetPes.png" alt="" />
        </li>
      </ul>
    </div>
  );
};

export default OffersLeftMenu;
