import React, { useState } from 'react';
import useEntityMutation from '../../hooks/useEntityMutation';
import { FiFileText, FiAward, FiCheckCircle, FiCpu } from 'react-icons/fi';

export default function CvOptimizer() {
  const [cvText, setCvText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const optimizeMutation = useEntityMutation({ entityName: 'cv_optimization' });

  const handleOptimize = async () => {
    if (cvText.trim().length < 50) {
      alert("Por favor, pega un poco más de texto de tu CV para que Gemini pueda analizarlo bien.");
      return;
    }

    try {
      const response = await optimizeMutation.mutateAsync({
        action: 'create',
        entity: { cv_text: cvText },
        endpoint: '/api/ai/optimize-cv'
      });
      
      if (response && response.data) {
        setAnalysis(response.data);
      }
    } catch (error) {
      console.error("Error al optimizar:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FiCpu className="text-[var(--color-brand-secondary)]" size={32} />
            Coach Evolutivo: Optimizador de CV
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Pega el texto de tu currículum actual. Mi Inteligencia Artificial (Gemini) lo analizará en segundos para decirte cómo pasar los filtros de las empresas (ATS) y destacar.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <FiFileText size={250} className="-mr-10 -mt-10" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Lado Izquierdo: Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <label className="font-semibold text-gray-700 mb-3 block">
            Pega tu Currículum (Experiencia, Habilidades, Perfil):
          </label>
          <textarea 
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            className="w-full flex-1 min-h-[300px] p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all resize-none font-mono text-sm"
            placeholder="Ejemplo: Desarrollador Backend con 2 años de experiencia usando Python y Node.js. Lideré el desarrollo de la API de pagos..."
          ></textarea>
          
          <button 
            onClick={handleOptimize}
            disabled={optimizeMutation.isPending}
            className="mt-4 w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {optimizeMutation.isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FiAward size={20} />
            )}
            {optimizeMutation.isPending ? "Analizando con IA..." : "Optimizar mi CV ahora"}
          </button>
        </div>

        {/* Lado Derecho: Resultados (Mascota / Coach) */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
          {!analysis && !optimizeMutation.isPending && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
              <FiFileText size={64} className="mb-4 opacity-20" />
              <p>Tu análisis aparecerá aquí.</p>
            </div>
          )}

          {optimizeMutation.isPending && (
            <div className="h-full flex flex-col items-center justify-center text-[var(--color-brand-primary)] text-center animate-pulse">
              <FiCpu size={64} className="mb-4" />
              <p className="font-medium">Leyendo tu perfil...</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                  analysis.score >= 80 ? 'bg-green-100 text-green-600' :
                  analysis.score >= 50 ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {analysis.score}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Score de Impacto (ATS)</h3>
                  <p className="text-sm text-gray-500">Evaluado por el Coach Evolutivo</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-900">
                <p className="text-sm font-medium">💬 {analysis.feedback_general}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  Sugerencias de Mejora
                </h4>
                <ul className="space-y-3">
                  {analysis.mejoras.map((mejora, index) => (
                    <li key={index} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-sm">
                      <strong className="text-[var(--color-brand-primary)]">{mejora.seccion}:</strong> {mejora.sugerencia}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">CV Optimizado (Resumen Profesional):</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap shadow-inner">
                  {analysis.cv_optimizado}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
