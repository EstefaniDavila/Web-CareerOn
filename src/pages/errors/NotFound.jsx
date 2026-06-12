import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[var(--color-brand-bg)] p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiAlertTriangle size={40} className="text-red-500" />
        </div>
        <h1 className="text-6xl font-bold text-[var(--color-brand-text)] mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--color-brand-text)] mb-4">Página no encontrada</h2>
        <p className="text-[var(--color-brand-subtext)] mb-8">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <Link 
          to="/dashboard" 
          className="flex items-center justify-center gap-2 w-full bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white p-4 rounded-xl font-bold transition-all"
        >
          <FiHome size={20} />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
