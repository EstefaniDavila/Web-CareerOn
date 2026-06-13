import React from 'react';
import LeftSidebar from '../../components/LeftSidebar';
import CvOptimizer from '../cv/CvOptimizer';

const Profile = () => {
  return (
    <div className="flex gap-6 w-full items-start justify-center max-w-[1600px] mx-auto">
      {/* Sidebar Izquierda: Estática */}
      <div className="hidden lg:block shrink-0">
        <LeftSidebar />
      </div>

      {/* Contenido Central: Optimizador de CV */}
      <div className="flex-1 w-full min-w-0 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mi Perfil Profesional</h2>
          <p className="text-gray-500 text-sm">
            Aquí puedes gestionar tu información y usar nuestro Coach Evolutivo para adaptar tu currículum a cualquier oferta.
          </p>
        </div>
        
        {/* Renderizamos el CvOptimizer embebido */}
        <CvOptimizer />
      </div>
    </div>
  );
};

export default Profile;
