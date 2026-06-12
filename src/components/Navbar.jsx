import { useMsal } from "@azure/msal-react";
import { FiBell, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const { accounts } = useMsal();
  const userName = accounts[0]?.name || "Usuario";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Barra de búsqueda */}
        <div className="flex items-center flex-1 max-w-lg">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar misiones, habilidades..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--color-brand-bg)] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
            />
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="flex items-center gap-4 ml-4">
          <button className="relative p-2 rounded-full text-[var(--color-brand-subtext)] hover:bg-[var(--color-brand-bg)] transition-colors">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-brand-accent)] rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">{userName.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium text-[var(--color-brand-text)] hidden lg:block">{userName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
