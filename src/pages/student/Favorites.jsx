import React from 'react';
import LeftSidebar from '../../components/LeftSidebar';
import { FiBookmark, FiMapPin } from 'react-icons/fi';

export default function Favorites() {
  const mockFavorites = [
    { id: 1, title: 'Desarrollador Backend Python', company: 'Yape', location: 'Lima, Perú', type: 'Híbrido' },
    { id: 3, title: 'Ingeniero de Software React', company: 'Rappi', location: 'Bogotá, Colombia', type: 'Remoto' }
  ];

  return (
    <div className="flex gap-6 w-full items-start">
      <div className="hidden lg:block shrink-0 self-start sticky top-[88px]">
        <LeftSidebar />
      </div>
      
      <div className="flex-1 w-full min-w-0 pb-12 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FiBookmark className="text-[var(--color-brand-primary)]" /> Ofertas Guardadas
          </h2>
          <p className="text-gray-500 text-sm">Tus empleos favoritos listos para postular.</p>
        </div>

        <div className="grid gap-4">
          {mockFavorites.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row justify-between items-center hover:border-[var(--color-brand-primary)] transition-all">
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-[var(--color-brand-primary)] text-xl border border-gray-100">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                  <div className="flex gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1 font-medium text-[var(--color-brand-primary)]">{job.company}</span>
                    <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                  </div>
                </div>
              </div>
              <button className="mt-4 sm:mt-0 px-6 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shrink-0">
                Postular
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
