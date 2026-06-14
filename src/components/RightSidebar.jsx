import React, { useState } from 'react';
import { useQuests } from '../hooks/useQuests';
import { FiX, FiCheckCircle, FiPlayCircle } from 'react-icons/fi';
import './RightSidebar.css';

const RightSidebar = () => {
  const { quests, completeQuest } = useQuests();
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const handleStartChallenge = (q) => {
    if (q.completed) return;
    setActiveChallenge(q);
    setSimulating(false);
  };

  const handleFinishChallenge = () => {
    setSimulating(true);
    setTimeout(() => {
      completeQuest(activeChallenge.skill);
      setActiveChallenge(null);
      setSimulating(false);
    }, 1500); // Simulamos 1.5s de procesando
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
            {quests.map((q, idx) => (
              <div 
                key={idx} 
                className={`match-item cursor-pointer transition-all ${q.completed ? 'opacity-50 grayscale' : 'hover:bg-orange-50'}`}
                onClick={() => handleStartChallenge(q)}
              >
                <div className="match-icon tech text-xl bg-orange-100">{q.icon}</div>
                <div className="match-info">
                  <h4 className={`text-sm font-bold ${q.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {q.skill}
                  </h4>
                  <p className="text-xs mt-0.5">{q.completed ? '¡Completada!' : 'Iniciar Reto 🚀'}</p>
                </div>
                <div className="match-score !bg-orange-100 !text-orange-600 font-bold border-none text-xs">
                  +{q.xp} XP
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Simulador IA */}
      <div className="glass-card cta-card">
        <h3 className="cta-title">✦ Simular entrevista IA</h3>
        <p className="cta-text">Practica con Gemini antes de tu próxima entrevista técnica. Personalizado a la oferta que elijas.</p>
        <button className="btn-primary student-btn cta-btn">Comenzar ahora →</button>
      </div>

      {/* Modal de Reto */}
      {activeChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[var(--color-brand-primary)]">
            <div className="bg-[var(--color-brand-primary)] p-5 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <FiPlayCircle size={20} /> CareerOn Assessment
              </h3>
              <button onClick={() => setActiveChallenge(null)} className="hover:text-gray-200"><FiX size={24}/></button>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <span className="text-5xl">{activeChallenge.icon}</span>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Desafío: {activeChallenge.skill}</h2>
              <p className="text-gray-600 text-center text-sm mb-6 bg-orange-50 p-3 rounded-xl border border-orange-100">
                Resuelve este reto express avalado por la industria para demostrar tus conocimientos y certificar tu habilidad en tu perfil.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <p className="font-semibold text-sm text-gray-700 mb-3">Pregunta de evaluación rápida:</p>
                <p className="text-gray-600 text-sm">¿Cuál de las siguientes opciones describe mejor una buena práctica al implementar <strong>{activeChallenge.skill}</strong> en un entorno de producción?</p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-start gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer text-sm">
                    <input type="radio" name="quiz" className="mt-1" />
                    <span>Ignorar la documentación oficial y probar configuraciones aleatorias.</span>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer text-sm">
                    <input type="radio" name="quiz" className="mt-1" />
                    <span>Seguir los estándares de seguridad, escalabilidad y buenas prácticas del mercado.</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handleFinishChallenge}
                disabled={simulating}
                className="w-full py-4 bg-[var(--color-brand-cards)] text-white font-bold rounded-xl hover:bg-orange-500 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {simulating ? 'Validando Respuestas...' : 'Enviar Respuestas y Ganar XP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
