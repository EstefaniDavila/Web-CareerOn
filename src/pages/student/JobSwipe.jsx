import React, { useState, useEffect } from 'react';
import { FiHeart, FiX, FiInfo, FiCpu, FiFileText } from 'react-icons/fi';
import { useToast } from '../../components/ui/use-toast';
import { useConfirm } from '../../components/custom/alert';
import CvOptimizer from '../cv/CvOptimizer';
import useCrud from '../../hooks/useCrud';

export default function JobSwipe() {
  const { toast } = useToast();
  const confirm = useConfirm();
  const { getModel } = useCrud();
  
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para el modal de optimización de CV
  const [showOptimizerModal, setShowOptimizerModal] = useState(false);
  const [currentJobForOptimizer, setCurrentJobForOptimizer] = useState(null);

  useEffect(() => {
    // Para la demo, obtenemos los trabajos usando el hook crud
    // Si no tienes un endpoint de jobs publico, usa mocks. Asumimos que `/api/jobs` funciona.
    const fetchJobs = async () => {
      try {
        const data = await getModel('/api/jobs');
        if (data && data.data) {
          setJobs(data.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Fallback a datos mockeados para que la UI no se quede vacía
        setJobs([
          { id: 1, title: 'Desarrollador Backend Python', description: 'Únete a Yape para escalar nuestra arquitectura. Requiere Python, FastAPI y Postgres.', required_levels: ['Senior'] },
          { id: 2, title: 'Data Scientist Junior', description: 'Analiza datos masivos para BCP. Requiere Machine Learning, Python y SQL.', required_levels: ['Junior'] },
          { id: 3, title: 'Ingeniero de Software React', description: 'Crea interfaces increíbles para startups en Silicon Valley.', required_levels: ['Mid'] },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const currentJob = jobs[currentIndex];

  const handleSwipe = async (direction) => {
    if (!currentJob) return;

    if (direction === 'right') {
      // Le dio MATCH (Me gusta)
      const wantsToOptimize = await confirm({
        title: "¡Excelente elección!",
        body: `Antes de postular a "${currentJob.title}", ¿Quieres que mi IA analice y optimice tu CV para asegurar que pases el filtro técnico?`,
        actionButton: "¡Sí, optimizar mi CV!",
        cancelButton: "Postular directo"
      });

      if (wantsToOptimize) {
        // Mostrar Modal de IA
        setCurrentJobForOptimizer(currentJob);
        setShowOptimizerModal(true);
        return; // No avanzamos la tarjeta todavía
      } else {
        toast({
          title: "Postulación enviada",
          description: `Te has postulado a ${currentJob.title} con tu perfil actual.`,
          variant: "success",
          icon: <FiHeart className="text-green-500" />
        });
      }
    }

    // Avanzar a la siguiente tarjeta
    setCurrentIndex(prev => prev + 1);
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center p-12">Cargando ofertas de empleo...</div>;
  }

  if (showOptimizerModal) {
    return (
      <div className="animate-in fade-in zoom-in duration-300">
        <div className="mb-4 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
          <div>
            <h2 className="font-bold text-[var(--color-brand-primary)]">Optimizando para: {currentJobForOptimizer.title}</h2>
            <p className="text-sm text-gray-500">Pega tu CV y el Coach de IA lo adaptará para este puesto.</p>
          </div>
          <button 
            onClick={() => {
              setShowOptimizerModal(false);
              setCurrentIndex(prev => prev + 1); // Avanzamos a la siguiente tarjeta tras cerrar
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Aquí reciclamos el componente que ya creamos */}
        <CvOptimizer />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-brand-primary)] flex items-center justify-center gap-3">
          <FiTarget /> Explorar Vacantes
        </h1>
        <p className="text-[var(--color-brand-subtext)] mt-2">Encuentra tu próximo empleo ideal. Haz Match para desatar el poder del Coach Evolutivo.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
        {/* Columna Izquierda: El Coach Evolutivo */}
        <div className="hidden lg:flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[var(--color-brand-primary)] p-6 text-white text-center">
            <FiCpu size={48} className="mx-auto mb-3 opacity-90" />
            <h2 className="text-xl font-bold">Coach Evolutivo</h2>
            <p className="text-sm opacity-80">Nivel 5: Explorador</p>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center text-center space-y-6">
            <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm font-medium">
              "¡Hola! Soy tu Coach de Inteligencia Artificial. Haz Match (❤️) con las ofertas que te gusten y yo me encargaré de adaptar tu currículum para que las empresas no te puedan rechazar."
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 font-semibold">
                <span>XP para Evolucionar</span>
                <span>850 / 1000</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-[var(--color-brand-accent)] h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Central: Tinder Card */}
        <div className="flex items-center justify-center relative">
          {currentJob ? (
            <div className="w-full max-w-md h-full bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative z-10">
              
              {/* Header Tarjeta */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 border-b border-gray-100 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                   94% Match IA
                </div>
                <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center mb-5 border border-gray-100 transform rotate-3">
                  <FiFileText size={40} className="text-[var(--color-brand-primary)] -rotate-3" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{currentJob.title}</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-[var(--color-brand-cards)] text-white text-xs font-bold rounded-lg shadow-sm">
                    {currentJob.required_levels ? currentJob.required_levels.join(', ') : 'Tecnología'}
                  </span>
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg shadow-sm">
                    Presencial
                  </span>
                </div>
              </div>

              {/* Body Tarjeta */}
              <div className="p-8 flex-1 overflow-y-auto bg-white">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                  <FiInfo className="text-[var(--color-brand-accent)]" /> Descripción del Puesto
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {currentJob.description}
                </p>
              </div>

              {/* Botones (Swipe) */}
              <div className="p-6 flex justify-center gap-8 bg-gray-50 border-t border-gray-100">
                <button 
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center hover:scale-110 hover:bg-red-50 transition-all border border-red-100"
                >
                  <FiX size={32} />
                </button>
                <button 
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 rounded-full bg-white text-green-500 shadow-lg flex items-center justify-center hover:scale-110 hover:bg-green-50 transition-all border border-green-100 group"
                >
                  <FiHeart size={32} fill="currentColor" className="group-hover:animate-ping absolute opacity-20" />
                  <FiHeart size={32} fill="currentColor" className="relative z-10" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-100 w-full h-full flex flex-col items-center justify-center">
              <FiCpu size={80} className="text-gray-200 mb-6" />
              <h2 className="text-2xl font-bold text-gray-700">¡Eso es todo por hoy!</h2>
              <p className="text-gray-500 mt-2 max-w-xs">Has revisado todas las opciones disponibles. Vuelve mañana para ver nuevas oportunidades.</p>
            </div>
          )}
        </div>

        {/* Columna Derecha: Beneficios y Matches */}
        <div className="hidden lg:flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4">Tus Beneficios Activos</h3>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-2xl border border-orange-200">
            <h4 className="font-bold text-orange-800 flex items-center gap-2 mb-1">
              <span className="text-xl">🪙</span> Monedas Ganadas
            </h4>
            <p className="text-2xl font-black text-orange-600">1,250</p>
            <p className="text-xs text-orange-700 mt-1">Úsalas para optimizar tu CV con IA.</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">Últimos Matches</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-500 font-bold">Y</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Dev React · Yape</p>
                  <p className="text-xs text-green-600 font-medium">98% Match IA</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-orange-500 font-bold">B</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Data Analyst · BCP</p>
                  <p className="text-xs text-green-600 font-medium">91% Match IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
