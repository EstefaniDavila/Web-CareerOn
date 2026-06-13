import React, { useState } from 'react';
import RecruiterLeftSidebar from '../../components/recruiter/RecruiterLeftSidebar';
import { FiBriefcase, FiCpu, FiCode, FiCheck, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function CreateOffer() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex gap-6 w-full items-start justify-center max-w-[1600px] mx-auto recruiter-theme">
      <div className="hidden lg:block shrink-0">
        <RecruiterLeftSidebar />
      </div>
      
      <div className="flex-1 w-full min-w-0 pb-12 animate-in fade-in duration-300">
        
        {/* Wizard Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Crear Nueva Oferta</h2>
            <p className="text-gray-500 text-sm">Paso {step} de 3: {step === 1 ? 'Datos Básicos' : step === 2 ? 'Filtros IA' : 'Patrocinar Challenge'}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-12 h-2 rounded-full ${step >= i ? 'bg-[var(--color-brand-accent)]' : 'bg-gray-100'}`}></div>
            ))}
          </div>
        </div>

        {/* Wizard Body */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          
          {/* STEP 1: Datos Básicos */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><FiBriefcase className="text-[var(--color-brand-accent)]"/> Información del Puesto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Título de la Oferta</label>
                  <input type="text" placeholder="Ej. Desarrollador Frontend React Mid-Senior" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-accent)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Modalidad</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none">
                    <option>Remoto</option>
                    <option>Híbrido</option>
                    <option>Presencial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rango Salarial (Opcional)</label>
                  <input type="text" placeholder="S/. 3,000 - S/. 4,500" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Descripción y Responsabilidades</label>
                  <textarea rows="5" placeholder="Detalla las funciones principales..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Filtros de IA */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><FiCpu className="text-[var(--color-brand-accent)]"/> Filtros de Afinidad con IA</h3>
              
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm text-blue-800 font-medium">CarrerOn analizará los currículums automáticamente y descartará o priorizará candidatos según el porcentaje de Match que configures aquí.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">Afinidad Mínima Requerida (Match ATS)</label>
                <div className="flex items-center gap-6">
                  <input type="range" min="0" max="100" defaultValue="75" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-accent)]" />
                  <span className="text-3xl font-black text-[var(--color-brand-accent)]">75%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Solo verás postulantes que tengan al menos un 75% de similitud con tu oferta.</p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">Habilidades Clave Excluyentes (Skills)</label>
                <input type="text" placeholder="Ej. React, Node.js, AWS (Presiona Enter para agregar)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none" />
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg flex items-center gap-1">React <button>×</button></span>
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg flex items-center gap-1">Node.js <button>×</button></span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Patrocinar Challenge */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><FiCode className="text-[var(--color-brand-accent)]"/> Desafío Técnico Patrocinado (Opcional)</h3>
              
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
                <p className="text-sm text-amber-900 font-medium">Acelera tu proceso adjuntando una prueba técnica. Los candidatos que la pasen irán directo a tu bandeja de prioridades. Costo: <strong className="text-[var(--color-brand-accent)]">500 Créditos</strong>.</p>
              </div>

              <div className="space-y-4">
                <label className="flex p-4 border-2 border-[var(--color-brand-accent)] bg-red-50 rounded-xl cursor-pointer">
                  <input type="radio" name="challenge" className="mt-1 mr-4 accent-[var(--color-brand-accent)]" defaultChecked />
                  <div>
                    <p className="font-bold text-gray-900">Reto de Algoritmia y React</p>
                    <p className="text-sm text-gray-600">Construir un carrito de compras con estados globales en 45 min.</p>
                  </div>
                </label>
                <label className="flex p-4 border border-gray-200 hover:border-gray-300 rounded-xl cursor-pointer">
                  <input type="radio" name="challenge" className="mt-1 mr-4 accent-[var(--color-brand-accent)]" />
                  <div>
                    <p className="font-bold text-gray-900">Reto Backend Node.js</p>
                    <p className="text-sm text-gray-600">Crear una API RESTful con autenticación en 60 min.</p>
                  </div>
                </label>
                <label className="flex p-4 border border-gray-200 hover:border-gray-300 rounded-xl cursor-pointer">
                  <input type="radio" name="challenge" className="mt-1 mr-4 accent-[var(--color-brand-accent)]" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">No incluir desafío técnico</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Wizard Footer (Buttons) */}
          <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
            <button 
              onClick={() => setStep(step - 1)} 
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 font-bold text-gray-600 hover:text-gray-900 disabled:opacity-0 transition-all"
            >
              <FiChevronLeft /> Atrás
            </button>
            
            {step < 3 ? (
              <button 
                onClick={() => setStep(step + 1)} 
                className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 shadow-md transition-all"
              >
                Siguiente <FiChevronRight />
              </button>
            ) : (
              <button 
                className="flex items-center gap-2 px-8 py-3 bg-[var(--color-brand-accent)] text-white font-bold rounded-xl hover:bg-[#b01e3b] shadow-md transition-all"
              >
                <FiCheck /> Publicar Oferta Oficialmente
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
