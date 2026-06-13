import React, { useState, useEffect } from 'react';
import useCrud from '../../hooks/useCrud';
import { FiBriefcase, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiMoreHorizontal } from 'react-icons/fi';

export default function MyApplications() {
  const { getModel } = useCrud('/api/student/applications');
  const [loading, setLoading] = useState(true);
  
  // Kanban state
  const [columns, setColumns] = useState({
    'Pendiente': { name: 'Postulado', items: [] },
    'En Revisión': { name: 'En Revisión', items: [] },
    'Entrevista': { name: 'Entrevista', items: [] },
    'Oferta': { name: 'Oferta', items: [] },
    'Rechazado': { name: 'Rechazado', items: [] }
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getModel();
        
        // Populate Kanban
        const newCols = {
          'Pendiente': { name: 'Postulado', items: [] },
          'En Revisión': { name: 'En Revisión', items: [] },
          'Entrevista': { name: 'Entrevista', items: [] },
          'Oferta': { name: 'Oferta', items: [] },
          'Rechazado': { name: 'Rechazado', items: [] }
        };
        
        if (data && Array.isArray(data)) {
          data.forEach(app => {
            const status = app.status || 'Pendiente';
            if (newCols[status]) {
              newCols[status].items.push(app);
            } else {
              newCols['Pendiente'].items.push(app);
            }
          });
        }
        
        setColumns(newCols);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'En Revisión': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Entrevista': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Oferta': return 'bg-green-50 text-green-600 border-green-200';
      case 'Rechazado': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Mis Postulaciones</h1>
          <p className="text-gray-500">Da seguimiento a todos tus procesos de selección en un solo lugar.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[600px]">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                <div className="h-24 bg-gray-200 rounded-xl"></div>
                <div className="h-24 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 h-[650px] snap-x">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="min-w-[300px] w-[300px] bg-white border border-gray-100 rounded-2xl flex flex-col snap-center shadow-sm">
              <div className={`p-4 border-b border-gray-100 flex items-center justify-between rounded-t-2xl ${getStatusColor(columnId).split(' ')[0]}`}>
                <h2 className={`font-bold ${getStatusColor(columnId).split(' ')[1]}`}>{column.name}</h2>
                <span className="bg-white text-gray-500 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  {column.items.length}
                </span>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar bg-gray-50/50">
                {column.items.map((app) => (
                  <div key={app.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[var(--color-brand-primary)] group cursor-pointer relative">
                    <div className="absolute top-4 right-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiMoreHorizontal size={20} />
                    </div>
                    <div className="font-bold text-gray-900 mb-1 pr-6">{app.job_title}</div>
                    <div className="text-[var(--color-brand-accent)] font-medium text-sm mb-3">{app.company_name}</div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <FiMapPin className="shrink-0" />
                        <span className="truncate">{app.location || 'Remoto'}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                        <FiClock className="shrink-0" />
                        <span>Postulado: {new Date(app.applied_at || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {app.match_score && (
                      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Match de IA</span>
                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-md">{app.match_score}%</span>
                      </div>
                    )}
                  </div>
                ))}

                {column.items.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6 text-center space-y-2 opacity-50">
                    <FiCheckCircle size={32} />
                    <p className="text-sm">No hay empleos en esta etapa</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
