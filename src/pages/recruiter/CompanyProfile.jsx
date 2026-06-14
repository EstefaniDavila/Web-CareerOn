import React from 'react';
import RecruiterLeftSidebar from '../../components/recruiter/RecruiterLeftSidebar';
import { FiEdit3, FiImage, FiGlobe, FiUsers } from 'react-icons/fi';

export default function CompanyProfile() {
  return (
    <div className="flex gap-6 w-full items-start justify-center max-w-[1600px] mx-auto recruiter-theme">
      <div className="hidden lg:block shrink-0">
        <RecruiterLeftSidebar />
      </div>
      
      <div className="flex-1 w-full min-w-0 pb-12 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Perfil de la Empresa</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
              <FiEdit3 /> Editar Perfil
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors shrink-0">
              <FiImage size={32} className="mb-2" />
              <span className="text-xs font-medium">Subir Logo</span>
            </div>
            
            <div className="flex-1 space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Empresa</label>
                  <input type="text" defaultValue="Tech Innovators S.A.C." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-accent)] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sector / Industria</label>
                  <input type="text" defaultValue="Desarrollo de Software" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-accent)] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiGlobe /> Sitio Web</label>
                  <input type="url" defaultValue="https://techinnovators.pe" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-accent)] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><FiUsers /> Tamaño de Empresa</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-accent)] outline-none transition-all">
                    <option>1-50 empleados</option>
                    <option>51-200 empleados</option>
                    <option selected>201-500 empleados</option>
                    <option>500+ empleados</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción (Cultura y Misión)</label>
                <textarea rows="4" defaultValue="Somos una empresa líder en transformación digital..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-accent)] outline-none transition-all resize-none"></textarea>
              </div>

              <div className="flex justify-end">
                <button className="px-8 py-3 bg-[var(--color-brand-accent)] hover:bg-[#b01e3b] text-white font-bold rounded-xl shadow-md transition-all">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
