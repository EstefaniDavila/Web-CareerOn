import { useMsal } from "@azure/msal-react";
import { FiHome, FiFileText, FiTarget, FiLogOut, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStatus } from "../hooks/useUserStatus";

export default function Sidebar() {
  const { instance, accounts } = useMsal();
  const userName = accounts[0]?.name || "Usuario";
  const userEmail = accounts[0]?.username || "";

  const navigate = useNavigate();
  const { userType } = useUserStatus();

  const handleLogout = () => {
    localStorage.removeItem("mock_token");
    localStorage.removeItem("user_data");
    window.location.href = "/";
  };

  const studentItems = [
    { to: "/dashboard", icon: FiHome, label: "Dashboard" },
    { to: "/explorar", icon: FiTarget, label: "Explorar Empleos" },
    { to: "/cv-optimizer", icon: FiFileText, label: "CV Optimizer" },
  ];

  const recruiterItems = [
    { to: "/dashboard", icon: FiHome, label: "Talent Dashboard" },
    { to: "/buscar-talento", icon: FiUser, label: "Buscar Talento" },
    { to: "/mis-vacantes", icon: FiFileText, label: "Mis Vacantes" },
  ];

  const navItems = userType === "Company" ? recruiterItems : studentItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img 
            src="https://res.cloudinary.com/dpuu7ddmk/image/upload/f_auto,q_auto/v1/WhatsApp_Image_2026-05-15_at_07.33.47_f5iq9x" 
            alt="CarrerOn Logo" 
            className="h-10 w-auto" 
          />
          <span className="font-bold text-xl text-[var(--color-brand-primary)] tracking-tight">CarrerOn</span>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-brand-primary)] text-white shadow-md"
                      : "text-[var(--color-brand-subtext)] hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)]"
                  }`
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Perfil y Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center flex-shrink-0">
            <FiUser className="text-white" size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-[var(--color-brand-text)] truncate">
              Hola, {userName.split(' ')[0]}
            </p>
            <p className="text-xs text-[var(--color-brand-subtext)] truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <FiLogOut size={18} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
