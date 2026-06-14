import React, { useState, useEffect } from 'react';
import { FiSearch, FiBookmark, FiCpu, FiCheckCircle, FiBriefcase, FiMapPin, FiX, FiCalendar } from 'react-icons/fi';
import { useToast } from './ui/use-toast';
import useCrud from '../hooks/useCrud';
import useEntityMutation from '../hooks/useEntityMutation';
import { useQuests } from '../hooks/useQuests';
import { useNavigate } from 'react-router-dom';
import './FeedCentral.css';

const FeedCentral = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getModel } = useCrud('/api/student/jobs');
  const { mutateAsync } = useEntityMutation({ entityName: 'application' });
  const { addQuests } = useQuests();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);

  const [evaluatingJob, setEvaluatingJob] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleApply = async (job, e) => {
    e.stopPropagation();
    setApplyingJobId(job.id);
    try {
      await mutateAsync({action: "create", entity: {},endpoint: `/api/student/jobs/${job.id}/apply`});
      toast({ title: "Postulación enviada", description: "Has postulado exitosamente a " + job.company, variant: "success" });
    } catch (err) {
      toast({ title: "Error", description: err.message || "Ya has postulado a este empleo.", variant: "destructive" });
    } finally {
      setApplyingJobId(null);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getModel();
        if (data && Array.isArray(data)) {
          setJobs(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSaveJob = (job) => {
    toast({
      title: "Empleo Guardado",
      description: `${job.title} en ${job.company} se añadió a tus Favoritos.`,
      variant: "success",
      icon: <FiBookmark className="text-blue-500" />
    });
  };

  const handleEvaluateCV = async (job) => {
    setEvaluatingJob(job);
    setIsEvaluating(true);
    setEvaluationResult(null);

    try {
      const result = await getModel(`/api/ai/evaluate/${job.id}`);
      if (result && result.coach_analysis) {
        const missing = result.coach_analysis.missing_skills || [];
        setEvaluationResult({
          score: result.coach_analysis.match_score,
          feedback: result.coach_analysis.pet_message,
          missingSkills: missing,
        });

        if (missing.length > 0) {
          const generatedQuests = missing.map((skill, i) => {
            const templates = [
              { icon: '🧩', action: `CareerOn Micro-Reto: Fundamentos de ${skill} (10 min)`, xp: 150 },
              { icon: '⚡', action: `CareerOn Assessment: Demuestra tu nivel en ${skill}`, xp: 300 },
              { icon: '🎮', action: `Simulador interactivo CareerOn: Casos de uso de ${skill}`, xp: 250 },
              { icon: '🏆', action: `Desafío Exprés: Resuelve 3 problemas de ${skill}`, xp: 200 },
            ];
            return { skill, completed: false, ...templates[i % templates.length] };
          });
          addQuests(generatedQuests);
        }
      } else {
        throw new Error("Respuesta inválida de la IA");
      }
    } catch (err) {
      toast({ title: "Error en Evaluación", description: "No se pudo analizar el CV con la vacante. Intenta de nuevo.", variant: "destructive" });
      setEvaluatingJob(null);
    } finally {
      setIsEvaluating(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="feed-central-container flex-1 w-full min-w-0">

      <div className="glass-card search-header-card p-6 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-brand-primary)] mb-2">Encuentra tu próximo empleo</h1>
        <p className="text-sm text-gray-500 mb-4">Usa nuestro motor inteligente para descubrir oportunidades que hagan match con tu perfil.</p>

        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por cargo, empresa o tecnología..."
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--color-brand-primary)] focus:ring-0 transition-all text-gray-700 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>



      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <React.Fragment key={job.id}>
                {evaluatingJob?.id === job.id && (
                  <div className="mb-2 bg-white rounded-2xl shadow-xl border border-[var(--color-brand-primary)] overflow-hidden animate-in slide-in-from-top-4">
                    <div className="bg-[var(--color-brand-primary)] p-4 text-white flex justify-between items-center">
                      <h3 className="font-bold flex items-center gap-2">
                        <FiCpu /> Coach Evolutivo: Análisis de Brechas
                      </h3>
                      <button onClick={() => setEvaluatingJob(null)} className="text-white hover:text-gray-200">
                        <FiX size={24} />
                      </button>
                    </div>

                    <div className="p-6">
                      {isEvaluating ? (
                        <div className="flex flex-col items-center justify-center py-8">
                          <FiCpu size={48} className="text-[var(--color-brand-accent)] animate-pulse mb-4" />
                          <p className="text-gray-600 font-medium text-center">CareerOn está analizando tu perfil contra los requisitos de <strong>{evaluatingJob.company}</strong>...</p>
                          <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
                            <div className="bg-[var(--color-brand-accent)] h-2 rounded-full animate-w-full"></div>
                          </div>
                        </div>
                      ) : evaluationResult && (
                        <div className="space-y-4">

                          {/* Score + Mascota */}
                          <div className="flex gap-4 items-start">
                            {/* Mascota */}
                            <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md"
                              style={{ background: evaluationResult.score >= 70 ? 'linear-gradient(135deg, #d1fae5, #6ee7b7)' : 'linear-gradient(135deg, #fef3c7, #fcd34d)' }}>
                              {evaluationResult.score >= 80 ? '🦅' : evaluationResult.score >= 60 ? '🦊' : '🐣'}
                            </div>
                            {/* Burbuja de chat */}
                            <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl rounded-tl-none p-4 text-sm text-blue-900 leading-relaxed">
                              <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-blue-100"></div>
                              <p className="font-semibold text-blue-700 mb-1 text-base">
                                {evaluationResult.score >= 80 ? '¡Lo tienes, campeón! 🔥' : evaluationResult.score >= 60 ? '¡Vas por buen camino! 💪' : '¡No te rindas, yo te ayudo! 🚀'}
                              </p>
                              {evaluationResult.feedback}
                            </div>
                          </div>

                          {/* Score ring */}
                          <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                            <div className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-black text-lg shrink-0"
                              style={{
                                borderColor: evaluationResult.score >= 80 ? '#22c55e' : evaluationResult.score >= 60 ? '#f59e0b' : '#ef4444',
                                color: evaluationResult.score >= 80 ? '#22c55e' : evaluationResult.score >= 60 ? '#f59e0b' : '#ef4444'
                              }}>
                              {evaluationResult.score}%
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">Compatibilidad con el puesto</p>
                              <p className="text-xs text-gray-400">{evaluatingJob.title} · {evaluatingJob.company}</p>
                            </div>
                          </div>

                          {/* Quests de gamificación por skill */}
                          {evaluationResult.missingSkills?.length > 0 ? (
                            <div className="space-y-3">
                              <p className="font-bold text-gray-700 flex items-center gap-2 text-sm">
                                🎯 Tus misiones para conseguir este empleo:
                              </p>
                              {evaluationResult.missingSkills.map((skill, i) => {
                                const quests = [
                                  { icon: '📺', action: `Mira un tutorial de ${skill} en YouTube (45 min)`, xp: 150 },
                                  { icon: '📖', action: `Lee la documentación oficial de ${skill} (30 min)`, xp: 100 },
                                  { icon: '💻', action: `Crea un mini proyecto usando ${skill}`, xp: 300 },
                                  { icon: '🤝', action: `Únete a una comunidad de ${skill} en Discord`, xp: 75 },
                                ];
                                const q = quests[i % quests.length];
                                return (
                                  <div key={skill} className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-3">
                                    <span className="text-2xl shrink-0">{q.icon}</span>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-bold text-orange-800 text-sm">{skill}</p>
                                      <p className="text-orange-700 text-xs mt-0.5">{q.action}</p>
                                    </div>
                                    <div className="shrink-0 bg-orange-400 text-white text-xs font-black px-2 py-1 rounded-lg">
                                      +{q.xp} XP
                                    </div>
                                  </div>
                                );
                              })}
                              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl p-3 mt-1">
                                <span className="text-xl">🏆</span>
                                <p className="text-xs text-gray-600 font-medium">Completa las misiones → Acumula XP → ¡Consigue el empleo!</p>
                              </div>
                            </div>
                          ) : evaluationResult.score >= 80 ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                              <span className="text-3xl">🎉</span>
                              <div>
                                <p className="font-bold text-green-700">¡Tu perfil encaja perfectamente!</p>
                                <p className="text-green-600 text-sm">No hay brechas detectadas. ¡Postula cuanto antes!</p>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
                              <span className="text-3xl">📚</span>
                              <div>
                                <p className="font-bold text-amber-700">Hay áreas por mejorar</p>
                                <p className="text-amber-600 text-sm">Revisa el feedback del Coach y trabaja en las habilidades que menciona para subir tu compatibilidad.</p>
                              </div>
                            </div>
                          )}

                          <div className="pt-2 flex flex-col gap-3">
                            <button
                              onClick={() => navigate('/profile')}
                              className="w-full py-3.5 bg-[var(--color-brand-cards)] text-white font-bold rounded-xl hover:bg-orange-500 shadow-md transition-colors flex items-center justify-center gap-2"
                            >
                              <FiCheckCircle /> ¡Optimicemos tu CV ahora!
                            </button>
                            <button
                              onClick={() => navigate(`/interview/${evaluatingJob.id}`)}
                              className="w-full py-3.5 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:opacity-90 shadow-md transition-colors flex items-center justify-center gap-2"
                            >
                              🎤 Simular Entrevista (Cam + IA)
                            </button>
                            <button
                              onClick={(e) => handleApply(evaluatingJob, e)}
                              disabled={applyingJobId === evaluatingJob.id}
                              className="w-full py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
                            >
                              {applyingJobId === evaluatingJob.id ? 'Enviando...' : 'Postular de todos modos'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div 
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start cursor-pointer hover:border-[var(--color-brand-primary)]"
                >

                <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-[var(--color-brand-primary)] text-2xl border border-gray-100">
                  {job.company.charAt(0)}
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-xl truncate pr-4">{job.title}</h3>
                    <button
                      onClick={() => handleSaveJob(job)}
                      className="p-2 -mr-2 text-gray-400 hover:text-[var(--color-brand-accent)] hover:bg-orange-50 rounded-full transition-colors md:hidden shrink-0"
                    >
                      <FiBookmark size={20} />
                    </button>
                  </div>

                  <p className="text-[var(--color-brand-primary)] font-semibold text-base mb-3">{job.company}</p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                      <FiMapPin /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                      <FiBriefcase /> {job.job_type || 'Tiempo completo'}
                    </span>
                    {job.deadline && (
                      <span className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full font-medium">
                        <FiCalendar /> Límite: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-0 md:pr-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEvaluateCV(job); }}
                      className="px-5 py-2.5 border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <FiCpu size={18} /> Evaluar CV IA
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/interview/${job.id}`); }}
                      className="px-5 py-2.5 bg-[#5B34F2] text-white font-bold text-sm rounded-xl hover:bg-[#4A2BC4] transition-colors flex items-center gap-2 shadow-sm"
                    >
                      🎤 Simular Entrevista
                    </button>
                  </div>
                </div>

                <div className="w-full md:w-48 flex flex-col gap-3 shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSaveJob(job); }}
                    className="hidden md:flex items-center justify-center gap-2 p-2.5 text-gray-500 hover:text-[var(--color-brand-accent)] hover:bg-orange-50 rounded-xl transition-colors font-medium border border-transparent hover:border-orange-100"
                  >
                    <FiBookmark size={18} /> Guardar Oferta
                  </button>

                  <button
                    onClick={(e) => handleApply(job, e)}
                    disabled={applyingJobId === job.id}
                    className="w-full bg-gray-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {applyingJobId === job.id ? 'Enviando...' : 'Postular Ahora'}
                  </button>
                </div>
              </div>
              </React.Fragment>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No se encontraron empleos para "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Modal de Detalles del Empleo (Estilo Premium/LinkedIn) */}
      {selectedJob && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            
            {/* Header del Modal - Estilo Minimalista */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-start justify-between bg-white relative">
              <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full transition-colors">
                <FiX size={24} />
              </button>
              
              <div className="flex gap-5 items-start pr-12">
                <div className="w-16 h-16 shrink-0 bg-white rounded-xl flex items-center justify-center font-bold text-[var(--color-brand-primary)] text-3xl border border-gray-100 shadow-sm mt-1">
                  {selectedJob.company.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{selectedJob.title}</h2>
                  <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2 mb-3">
                    <span className="font-semibold text-gray-900">{selectedJob.company}</span>
                    <span>·</span>
                    <span>{selectedJob.location || 'Perú'}</span>
                    <span>·</span>
                    <span>hace {selectedJob.posted_days_ago || 3} días</span>
                    <span>·</span>
                    <span className="text-green-600 font-medium">{selectedJob.applicants_count || 42} solicitudes</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1.5 bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium text-xs border border-gray-200">
                      <FiCheckCircle className="text-gray-400" /> {selectedJob.location || 'Remoto'}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium text-xs border border-gray-200">
                      <FiBriefcase className="text-gray-400" /> {selectedJob.type || 'Jornada completa'}
                    </span>
                    {selectedJob.salary_range && (
                      <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg font-medium text-xs border border-green-100">
                        💰 {selectedJob.salary_range}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={(e) => handleApply(selectedJob, e)}
                      disabled={applyingJobId === selectedJob.id}
                      className="bg-[#0a66c2] hover:bg-[#004182] text-white font-bold px-6 py-2.5 rounded-full shadow-sm transition-colors text-sm disabled:opacity-50"
                    >
                      {applyingJobId === selectedJob.id ? 'Enviando...' : 'Solicitud sencilla'}
                    </button>
                    <button
                      onClick={() => handleSaveJob(selectedJob)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition-colors text-sm"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8 bg-white">
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Acerca del empleo</h3>
                <div className="prose prose-sm md:prose-base text-gray-700 max-w-none leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedJob.description}
                </div>
              </div>

              {selectedJob.skills_required && selectedJob.skills_required.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Aptitudes requeridas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills_required.map((skill, i) => (
                      <span key={i} className="bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)] px-4 py-2 rounded-full text-sm font-bold border border-[rgba(28,107,114,0.1)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer flotante con IA */}
            <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex flex-col md:flex-row items-center justify-between mt-auto gap-4">
              <div className="w-full md:w-auto text-center md:text-left">
                <p className="text-sm font-bold text-gray-900 flex items-center justify-center md:justify-start gap-2">
                  <FiCpu className="text-[var(--color-brand-accent)]" /> ¿Preparado para postular?
                </p>
                <p className="text-xs text-gray-500 hidden md:block">Nuestra IA puede evaluar tu CV o simular una entrevista.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => { handleEvaluateCV(selectedJob); setSelectedJob(null); }}
                  className="flex-1 md:flex-none px-6 py-2.5 border-2 border-[var(--color-brand-accent)] text-[var(--color-brand-accent)] font-bold rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm bg-white"
                >
                  Analizar CV
                </button>
                <button
                  onClick={() => navigate(`/interview/${selectedJob.id}`)}
                  className="flex-1 md:flex-none px-6 py-2.5 bg-[#5B34F2] text-white font-bold rounded-xl hover:bg-[#4A2BC4] transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  🎤 Entrevista IA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FeedCentral;
