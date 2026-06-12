import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-[var(--color-brand-surface)] max-w-md w-full text-center">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="text-red-500 w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--color-brand-text)] mb-3">¡Oops! Acceso Denegado</h1>
        <p className="text-[var(--color-brand-subtext)] mb-8">
          Parece que intentaste entrar a una zona restringida de CarrerOn sin haber iniciado sesión con tu cuenta UTP.
        </p>

        <Link 
          to="/"
          className="w-full inline-flex items-center justify-center bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white font-semibold py-4 px-6 rounded-xl transition duration-200"
        >
          Ir a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
