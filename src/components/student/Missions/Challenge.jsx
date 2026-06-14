import React, { useState, useEffect } from "react";
import { FiUploadCloud, FiCheckCircle, FiX, FiPlayCircle } from "react-icons/fi";
import IAMissionModal from "../../../composables/Student/IAMissionsmodal";
import { useQuests } from "../../../hooks/useQuests";

import useCrud from "../../../hooks/useCrud";

const mockIAMissions = [
  {
    id: "ia-english",
    title: "Inglés Profesional (B2)",
    type: "ia",
    company: "Radar de Mercado",
    skill: "Inglés de Negocios",
    description: "El dominio del inglés es requisito en el 80% de empresas top.",
    activity: "Redacta un correo electrónico formal (en inglés) a un cliente importante explicándole que habrá un retraso justificado en la entrega de su proyecto.",
    rewardCoins: 100,
    rewardXP: 250,
  },
  {
    id: "ia-softskills",
    title: "Resolución de Conflictos",
    type: "ia",
    company: "Radar de Mercado",
    skill: "Inteligencia Emocional",
    description: "Habilidad clave sin importar tu carrera (Psicología, Negocios, Ingeniería).",
    activity: "Describe paso a paso cómo manejarías la situación si un compañero de tu equipo de trabajo critica fuertemente tus ideas frente a tu jefe.",
    rewardCoins: 150,
    rewardXP: 300,
  },
  {
    id: "ia-problem-solving",
    title: "Pensamiento Crítico",
    type: "ia",
    company: "Radar de Mercado",
    skill: "Problem Solving",
    description: "Las empresas buscan talento capaz de resolver ambigüedades.",
    activity: "Si tienes tres tareas urgentes asignadas para hoy y solo tienes tiempo para terminar una, ¿cuál es tu proceso lógico para decidir cuál priorizar?",
    rewardCoins: 80,
    rewardXP: 150,
  },
];

export default function Challenge() {
  const [tab, setTab] = useState("quest");
  const [search, setSearch] = useState("");

  const [postuladas, setPostuladas] = useState([]);
  const { getModel: getCompanyChallenges } = useCrud("/api/student/company-challenges");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getCompanyChallenges();
        if (data && Array.isArray(data)) {
          const mapped = data.map(c => ({
            id: c.application_id,
            job_id: c.job_id,
            challenge_id: c.challenge.id,
            title: c.challenge.title,
            type: "postulado",
            company: c.company_name,
            description: c.challenge.description,
            demo_only: false
          }));
          setPostuladas(mapped);
        }
      } catch (err) {
        console.error("Error fetching company challenges", err);
      }
    };
    fetchChallenges();
  }, []);

  const [iaMissions] = useState(mockIAMissions);
  const { quests, completeQuest, cancelQuest } = useQuests();
  const [simulatingQuest, setSimulatingQuest] = useState(null);
  const [activeQuestModal, setActiveQuestModal] = useState(null);
  const [aiQuestion, setAiQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [questAnswer, setQuestAnswer] = useState("");
  const [questResult, setQuestResult] = useState(null);
  const [viewingInstructions, setViewingInstructions] = useState(null);

  const [files, setFiles] = useState({});
  const [links, setLinks] = useState({});

  const backend_host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:8000";

  const openQuestModal = async (item) => {
    setActiveQuestModal(item);
    setLoadingQuestion(true);
    setAiQuestion(null);
    setQuestAnswer("");
    setQuestResult(null);

    try {
      if (item.type === "ia" && item.activity) {
        // Usar la pregunta predefinida para las misiones de Radar de Mercado
        setTimeout(() => {
          setAiQuestion({
            question: item.activity,
            question_type: "text"
          });
          setLoadingQuestion(false);
        }, 800); // Simulamos un pequeñito retraso para que se vea que "carga"
      } else {
        const token = localStorage.getItem('careeron_token');
        const response = await fetch(`${backend_host}/api/student/quests/generate?skill=${encodeURIComponent(item.skill)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch quest");
        }
        
        const data = await response.json();
        setAiQuestion(data.question);
        setLoadingQuestion(false);
      }
    } catch (error) {
      console.error("Error fetching quest", error);
      setLoadingQuestion(false);
    }
  };

  const submitQuestAnswer = async () => {
    if (!questAnswer.trim()) return;
    setSimulatingQuest(activeQuestModal.skill);
    try {
      const token = localStorage.getItem('careeron_token');
      const response = await fetch(`${backend_host}/api/student/quests/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          skill: activeQuestModal.skill,
          question: aiQuestion.question,
          answer: questAnswer
        })
      });
      const data = await response.json();

      setSimulatingQuest(null);

      let dynamicXP = 0;
      if (data.score >= 70) {
        dynamicXP = 50;
        if (data.score >= 80 && data.score < 90) dynamicXP = 80;
        if (data.score >= 90) dynamicXP = 120;
      }
      
      setQuestResult({ ...data, dynamicXP });

    } catch (error) {
      console.error("Error evaluando reto", error);
      setSimulatingQuest(null);
      setQuestResult({
        score: 0,
        feedback: "Hubo un error de conexión al evaluar tu respuesta. Inténtalo de nuevo.",
        error: true
      });
    }
  };

  const [selectedIAMission, setSelectedIAMission] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  const mappedQuests = quests.map(q => ({
    ...q,
    id: `quest_${q.skill}`,
    title: `Misión: Dominar ${q.skill}`,
    type: "quest",
    company: "Sistema CareerOn",
    description: q.action,
  }));

  const postuladasFiltered = postuladas;

  const allData = [...postuladasFiltered, ...iaMissions, ...mappedQuests];

  const filtered = allData.filter((item) => {
    const matchTab = tab === "all" ? true : item.type === tab;

    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  /* ---------------- POSTULADAS ---------------- */

  const handleFileChange = (e, id) => {
    setFiles((prev) => ({
      ...prev,
      [id]: e.target.files[0],
    }));
  };

  const handleLinkChange = (e, id) => {
    setLinks((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const handleSend = async (item) => {
    if (!files[item.id] && !links[item.id]) return;

    try {
      await fetch(`${backend_host}/api/student/applications/${item.id}/submit-challenge`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('careeron_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: links[item.id] || "Archivo adjunto" })
      });
      setPostuladas((prev) => prev.filter((m) => m.id !== item.id));
      alert("✅ Reto enviado correctamente a la empresa");
    } catch (e) {
      alert("Error al enviar el reto");
    }
  };

  /* ---------------- IA ---------------- */

  const handleOpenIAMission = (mission) => {
    setSelectedIAMission(mission);
    setUserAnswer("");
    setResult(null);
  };

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;

    const score = Math.floor(Math.random() * 41) + 60;

    setResult({
      score,
      feedback:
        score > 85
          ? "Excelente trabajo 🚀"
          : score > 70
            ? "Buen trabajo, pero puedes mejorar"
            : "Debes reforzar tus habilidades",
    });
  };

  const handleClose = () => {
    setSelectedIAMission(null);
    setUserAnswer("");
    setResult(null);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#1C1C1C]">
            Mis Misiones
          </h1>

          <input
            type="text"
            placeholder="Buscar misiones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2 rounded-lg bg-white border border-[#DCE5EC] focus:outline-none focus:ring-2 focus:ring-[#5B34F2]"
          />
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["quest", "ia", "postulado"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl transition-all font-bold shadow-sm ${tab === t
                ? "bg-[var(--color-brand-primary)] text-white ring-2 ring-[var(--color-brand-primary)] ring-offset-2"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {t === "postulado"
                ? "Empresas"
                : t === "ia"
                  ? "Misiones IA"
                  : "Sistema"}
            </button>
          ))}
        </div>

        {/* LISTA */}
        <div className="grid gap-4 w-full">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#DCE5EC] rounded-xl p-4"
            >
              <h2 className="font-semibold text-[#1C1C1C]">
                {item.title}
              </h2>

              <p className="text-sm text-[#5F6368]">
                {item.company}
              </p>

              {/* POSTULADAS */}
              {item.type === "postulado" && (
                <div className="mt-3 flex flex-col gap-4 border-t pt-3 border-gray-100">
                  <div className="flex justify-between items-start">
                    <p className="text-sm text-[#5F6368] line-clamp-2" title={item.description}>
                      {item.description}
                    </p>
                    <button 
                      onClick={() => setViewingInstructions(item)}
                      className="text-sm text-[#5B34F2] font-semibold underline hover:text-[#4320C9] shrink-0 ml-4"
                    >
                      Ver Instrucciones detalladas
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input 
                      type="url"
                      placeholder="Pega un enlace (Figma, GitHub, Drive...)"
                      className="flex-1 w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#5B34F2]"
                      value={links[item.id] || ""}
                      onChange={(e) => handleLinkChange(e, item.id)}
                    />
                    
                    <span className="text-gray-400 text-sm font-semibold">O</span>

                    <label className="flex items-center justify-center gap-2 text-sm cursor-pointer border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition min-w-[160px]">
                      <FiUploadCloud className={files[item.id] ? "text-[#5B34F2]" : "text-gray-500"}/>
                      <span className="truncate max-w-[120px]">
                        {files[item.id] ? files[item.id].name : "Subir archivo"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, item.id)}
                      />
                    </label>

                    <button
                      onClick={() => handleSend(item)}
                      disabled={!files[item.id] && !links[item.id]}
                      className={`px-6 py-2.5 rounded-lg text-white font-semibold transition ${
                        (files[item.id] || links[item.id])
                        ? "bg-[#5B34F2] hover:bg-[#4320C9] shadow-md"
                        : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Enviar reto
                    </button>
                  </div>
                </div>
              )}

              {/* IA */}
              {item.type === "ia" && (
                <div className="mt-3 flex justify-end border-t pt-3 border-gray-100">
                  <button
                    onClick={() => openQuestModal(item)}
                    className="px-6 py-2 bg-[var(--color-brand-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-brand-hover)] transition-colors shadow-sm"
                  >
                    Resolver Misión IA
                  </button>
                </div>
              )}

              {/* QUESTS (Gamificación) */}
              {item.type === "quest" && (
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t pt-3 border-gray-100">
                  <p className="text-sm text-[#5F6368] flex-1">
                    {item.description}
                  </p>

                  {item.completed ? (
                    <div className="flex items-center gap-2 text-green-600 font-bold px-4 py-2 bg-green-50 rounded-lg">
                      <FiCheckCircle /> Completada
                    </div>
                  ) : simulatingQuest === item.skill ? (
                    <div className="flex items-center justify-center gap-2 px-6 py-2 bg-orange-100 text-orange-600 font-bold rounded-lg animate-pulse">
                      Validando...
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => cancelQuest(item.skill)}
                        className="px-4 py-2 text-red-500 hover:bg-red-50 font-semibold rounded-lg transition-colors border border-red-200"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => openQuestModal(item)}
                        className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                      >
                        Resolver Misión
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Instrucciones (Postuladas) */}
      {viewingInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden p-8 relative flex flex-col max-h-[90vh]">
            <button onClick={() => setViewingInstructions(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6">Instrucciones del Reto Técnico</h2>
            
            <div className="overflow-y-auto pr-2">
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-[var(--color-brand-primary)]">📝</span> Descripción:
                </h3>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm">
                  {viewingInstructions.demo_only 
                    ? localStorage.getItem('careeron_demo_desc') || viewingInstructions.description 
                    : viewingInstructions.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-[var(--color-brand-primary)]">📦</span> Entregables requeridos:
                </h3>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {viewingInstructions.demo_only 
                    ? localStorage.getItem('careeron_demo_deliverables') || "Sube un PDF o un enlace a tu solución." 
                    : "Sube un documento PDF con tu solución o pega el enlace de tu proyecto para que nuestra IA pueda analizarlo."}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setViewingInstructions(null)} 
                className="bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)] text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all"
              >
                Entendido, ¡A trabajar!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reto (Sistema) */}
      {activeQuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[var(--color-brand-primary)]">
            <div className="bg-[var(--color-brand-primary)] p-5 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <FiPlayCircle size={20} /> CareerOn Assessment
              </h3>
              <button onClick={() => setActiveQuestModal(null)} className="hover:text-gray-200"><FiX size={24} /></button>
            </div>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <span className="text-5xl">{activeQuestModal.icon}</span>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Desafío: {activeQuestModal.skill}</h2>

              {loadingQuestion ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-sm text-gray-500">Generando un reto único para ti...</p>
                </div>
              ) : questResult ? (
                <div className="flex flex-col items-center animate-in zoom-in duration-300">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${questResult.score >= 70 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {questResult.score >= 70 ? '🎉' : '❌'}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${questResult.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {questResult.score >= 70 ? '¡Misión Superada!' : 'Misión Fallida'}
                  </h3>
                  <p className="font-semibold text-gray-700 mb-4 text-lg">Puntaje: {questResult.score}/100</p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 w-full text-left shadow-inner">
                    <p className="font-bold text-sm text-[#1C1C1C] mb-2 flex items-center gap-2">
                      Feedback de la IA:
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">{questResult.feedback}</p>
                  </div>
                  
                  {questResult.score >= 70 && (
                    <div className="bg-[#FFF4E5] border border-[#FFE0B2] rounded-xl p-4 mb-6 w-full text-center">
                      <p className="text-[#E65100] font-bold text-lg">¡Ganaste +{questResult.dynamicXP} XP!</p>
                      <p className="text-sm text-[#E65100] mt-1">Tu habilidad {activeQuestModal.skill} ha sido certificada.</p>
                    </div>
                  )}

                  {questResult.score >= 70 ? (
                    <button
                      onClick={() => {
                        completeQuest(activeQuestModal.skill, questResult.score);
                        setActiveQuestModal(null);
                      }}
                      className="w-full py-4 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors shadow-md text-lg"
                    >
                      Reclamar Recompensa
                    </button>
                  ) : (
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={() => setActiveQuestModal(null)}
                        className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Cerrar
                      </button>
                      <button
                        onClick={() => openQuestModal(activeQuestModal)}
                        className="flex-1 py-3 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors shadow-md"
                      >
                        Intentar de nuevo
                      </button>
                    </div>
                  )}
                </div>
              ) : aiQuestion ? (
                <>
                  <p className="text-gray-600 text-center text-sm mb-6 bg-orange-50 p-3 rounded-xl border border-orange-100">
                    Resuelve este reto avalado por la industria para certificar tu habilidad en tu perfil.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                    <p className="font-semibold text-sm text-gray-700 mb-3">Pregunta de evaluación rápida:</p>
                    <p className="text-gray-600 text-sm">{aiQuestion.question}</p>

                    <div className="mt-4">
                      {aiQuestion.question_type === 'multiple_choice' ? (
                        <div className="space-y-2">
                          {aiQuestion.options.map((opt, idx) => (
                            <label key={idx} className="flex items-start gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer text-sm">
                              <input
                                type="radio"
                                name="quest_quiz"
                                className="mt-1"
                                checked={questAnswer === opt}
                                onChange={() => setQuestAnswer(opt)}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <textarea
                            value={questAnswer}
                            onChange={(e) => setQuestAnswer(e.target.value)}
                            onPaste={(e) => e.preventDefault()}
                            onDrop={(e) => e.preventDefault()}
                            placeholder="Escribe tu respuesta, lógica o código aquí..."
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:outline-none min-h-[100px]"
                          ></textarea>
                          <p className="text-xs text-orange-500 font-medium flex items-center gap-1">
                            Por seguridad y para una evaluación justa, no está permitido pegar (Ctrl+V). ¡Confiamos en ti!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={submitQuestAnswer}
                    disabled={!questAnswer.trim() || simulatingQuest === activeQuestModal.skill}
                    className="w-full py-4 bg-[var(--color-brand-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-brand-hover)] transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {simulatingQuest === activeQuestModal.skill ? 'Evaluando con IA...' : 'Enviar Respuestas y Ganar XP'}
                  </button>
                </>
              ) : (
                <p className="text-center text-red-500">Error al cargar la pregunta.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}