import React from 'react';
import { useQuests } from '../hooks/useQuests';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import './RightSidebar.css';

const RightSidebar = () => {
  const { quests, cancelQuest } = useQuests();
  const navigate = useNavigate();

  const handleStartChallenge = (q) => {
    if (q.completed) return;
    navigate('/challenge'); 
  };

  return (
    <div className="right-sidebar relative">

      {/* Misiones del Coach Evolutivo */}
      <div className="glass-card matches-card">
        <h3 className="section-title flex items-center gap-2">
          <span className="text-orange-500">🏆</span> TUS MISIONES ACTIVAS
        </h3>
        
        {quests.length === 0 ? (
          <p className="text-sm text-gray-500 py-3 text-center">Aún no tienes misiones. ¡Evalúa tu CV en un empleo para obtener tus primeras quests!</p>
        ) : (
          <div className="space-y-3 mt-2">
            {quests.slice(0, 3).map((q, idx) => (
              <div 
                key={idx} 
                className={`match-item relative cursor-pointer transition-all ${q.completed ? 'opacity-50 grayscale' : 'hover:bg-orange-50'}`}
                onClick={() => handleStartChallenge(q)}
              >
                <div className="match-icon tech text-xl bg-orange-100">{q.icon}</div>
                <div className="match-info pr-8 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${q.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {q.skill}
                  </h4>
                  <p className="text-xs mt-0.5 truncate">{q.completed ? '¡Completada!' : 'Resolver Misión 🚀'}</p>
                </div>
                {!q.completed && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); cancelQuest(q.skill); }}
                    className="absolute right-3 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
                    title="Cancelar Misión"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerta de Reto de Empresa (Hackathon Demo) */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm animate-in slide-in-from-right-4 mt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-red-100 text-red-600 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0">
            🚨
          </div>
          <h3 className="text-red-800 font-bold text-base leading-tight">¡Acción Requerida! Google te envió un reto</h3>
        </div>
        <p className="text-red-700 text-xs mb-4">
          Has pasado el primer filtro. Para continuar en el proceso para <strong>Desarrollador Frontend</strong>, debes resolver esta evaluación técnica.
        </p>
        <button 
          onClick={() => navigate('/challenge')}
          className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-red-700 transition-colors shadow-md flex justify-center items-center gap-2"
        >
          Ir al Reto
        </button>
      </div>

    </div>
  );
};

export default RightSidebar;
