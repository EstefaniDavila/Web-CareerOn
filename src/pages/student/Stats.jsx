import React from 'react';
import LeftSidebar from '../../components/LeftSidebar';
import { FiTrendingUp, FiEye, FiCheckSquare, FiTarget } from 'react-icons/fi';

export default function Stats() {
  return (
    <div className="flex gap-6 w-full items-start">
      <div className="hidden lg:block shrink-0 self-start sticky top-[88px]">
        <LeftSidebar />
      </div>
      
      <div className="flex-1 w-full min-w-0 pb-12 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FiTrendingUp className="text-[var(--color-brand-primary)]" /> Estadísticas de Empleabilidad
          </h2>
          <p className="text-gray-500 text-sm">Mide el impacto de tu perfil en las empresas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4"><FiEye size={28} /></div>
            <h3 className="text-4xl font-black text-gray-900 mb-1">248</h3>
            <p className="text-gray-500 font-medium">Apariciones en Búsquedas</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4"><FiCheckSquare size={28} /></div>
            <h3 className="text-4xl font-black text-gray-900 mb-1">12</h3>
            <p className="text-gray-500 font-medium">Postulaciones Activas</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center md:col-span-2">
            <div className="w-20 h-20 mx-auto bg-orange-50 text-[var(--color-brand-accent)] rounded-full flex items-center justify-center mb-4"><FiTarget size={36} /></div>
            <h3 className="text-6xl font-black text-gray-900 mb-2">94%</h3>
            <p className="text-gray-500 font-medium text-xl">Promedio de Match IA con ofertas</p>
            <p className="text-base text-gray-400 mt-2">¡Tu CV está altamente optimizado para el mercado!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
