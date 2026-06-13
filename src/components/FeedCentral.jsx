import React, { useState, useEffect } from 'react';
import { FiSearch, FiBookmark, FiCpu, FiCheckCircle, FiBriefcase, FiMapPin, FiX } from 'react-icons/fi';
import { useToast } from './ui/use-toast';
import useCrud from '../hooks/useCrud';
import { useNavigate } from 'react-router-dom';
import './FeedCentral.css';

const FeedCentral = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getModel } = useCrud();
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estado para la evaluación de IA
  const [evaluatingJob, setEvaluatingJob] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    // Fetch mock jobs para la demo
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Simulamos llamada a API
        setTimeout(() => {
          setJobs([
            { id: 1, title: 'Desarrollador Backend Python', company: 'Yape', location: 'Lima, Perú', type: 'Híbrido', description: 'Únete a Yape para escalar nuestra arquitectura. Requiere Python, FastAPI y Postgres.', required_levels: ['Senior', 'Mid'] },
            { id: 2, title: 'Data Scientist Junior', company: 'BCP', location: 'Remoto', type: 'Remoto', description: 'Analiza datos masivos para BCP. Requiere Machine Learning, Python y SQL.', required_levels: ['Junior'] },
            { id: 3, title: 'Ingeniero de Software React', company: 'Rappi', location: 'Bogotá, Colombia', type: 'Remoto', description: 'Crea interfaces increíbles para nuestra SuperApp.', required_levels: ['Mid'] },
            { id: 4, title: 'Especialista en Ciberseguridad', company: 'Interbank', location: 'Lima, Perú', type: 'Presencial', description: 'Protege nuestros activos digitales. Experiencia en pentesting.', required_levels: ['Senior'] },
          ]);
          setLoading(false);
        }, 800);
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

    // Simulación del endpoint /api/ai/evaluate/{job_id}
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        score: Math.floor(Math.random() * (95 - 60 + 1) + 60), // Random score between 60-95
        feedback: `He analizado tu perfil contra la vacante de ${job.title}. Tienes buena experiencia base, pero te falta destacar más tus habilidades en ${job.title.includes('React') ? 'Hooks avanzados' : 'Bases de Datos Relacionales'}.`,
        action: "Tu CV actual necesita un ajuste de estructura para resaltar esas palabras clave y pasar el filtro de ATS de la empresa."
      });
    }, 2000);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="feed-central-container flex-1 w-full min-w-0">
      
      {/* Search Bar Header */}
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

      {/* Evaluation Modal / Overlay */}
      {evaluatingJob && (
        <div className="mb-6 bg-white rounded-2xl shadow-xl border border-[var(--color-brand-primary)] overflow-hidden animate-in slide-in-from-top-4">
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
                <p className="text-gray-600 font-medium text-center">Gemini está comparando tu CV actual con los requisitos de <strong>{evaluatingJob.company}</strong>...</p>
                <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
                  <div className="bg-[var(--color-brand-accent)] h-2 rounded-full animate-w-full"></div>
                </div>
              </div>
            ) : evaluationResult && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl" 
                    style={{ 
                      borderColor: evaluationResult.score >= 80 ? '#22c55e' : '#f59e0b',
                      color: evaluationResult.score >= 80 ? '#22c55e' : '#f59e0b'
                    }}>
                    {evaluationResult.score}%
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">Compatibilidad Calculada</h4>
                    <p className="text-sm text-gray-500">Puesto: {evaluatingJob.title}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm leading-relaxed">
                  <strong>Feedback del Coach:</strong> {evaluationResult.feedback}
                </div>
                
                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-sm text-orange-800 font-medium">
                  💡 {evaluationResult.action}
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => {
                      toast({title: "Postulación enviada", description: "Mucha suerte en el proceso.", variant: "success"});
                      setEvaluatingJob(null);
                    }}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Postular de todos modos
                  </button>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="flex-1 py-3 bg-[var(--color-brand-cards)] text-white font-bold rounded-xl hover:bg-orange-500 shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <FiCheckCircle /> ¡Optimicemos tu CV en tu Perfil!
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-5 items-start">
                
                {/* Logo Empresa */}
                <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-[var(--color-brand-primary)] text-2xl border border-gray-100">
                  {job.company.charAt(0)}
                </div>
                
                {/* Detalles Centrales */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-xl truncate pr-4">{job.title}</h3>
                    {/* Botón guardar visible solo en móvil */}
                    <button 
                      onClick={() => handleSaveJob(job)}
                      className="p-2 -mr-2 text-gray-400 hover:text-[var(--color-brand-accent)] hover:bg-orange-50 rounded-full transition-colors md:hidden shrink-0"
                    >
                      <FiBookmark size={20} />
                    </button>
                  </div>
                  
                  <p className="text-[var(--color-brand-primary)] font-semibold text-base mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3 text-xs md:text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <FiMapPin /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <FiBriefcase /> {job.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed pr-0 md:pr-4">
                    {job.description}
                  </p>
                </div>
                
                {/* Acciones (Columna Derecha) */}
                <div className="w-full md:w-56 flex flex-col gap-3 shrink-0 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <button 
                    onClick={() => handleSaveJob(job)}
                    className="hidden md:flex items-center justify-center gap-2 p-2.5 text-gray-500 hover:text-[var(--color-brand-accent)] hover:bg-orange-50 rounded-xl transition-colors font-medium border border-transparent hover:border-orange-100"
                  >
                    <FiBookmark size={18} /> Guardar Oferta
                  </button>
                  
                  <button 
                    onClick={() => toast({title: "Postulación enviada", description: "Has postulado a " + job.company, variant: "success"})}
                    className="w-full bg-gray-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Postular Ahora
                  </button>
                  
                  <button 
                    onClick={() => handleEvaluateCV(job)}
                    className="w-full border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-bold text-sm py-3.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FiCpu size={18}/> Evaluar CV IA
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-gray-500">
              No se encontraron empleos para "{searchQuery}"
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default FeedCentral;
