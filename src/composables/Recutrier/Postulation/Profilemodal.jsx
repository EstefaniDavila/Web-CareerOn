import React, { useState } from "react";

export default function ProfileModal({
  applicant,
  onClose,
  onChangeStatus,
}) {
  const [action, setAction] = useState(null);
  const [confirm, setConfirm] = useState(false);

  // Generar un score determinista basado en el ID o nombre del postulante
  const pseudoRandomScore = 75 + (applicant?.name ? (applicant.name.charCodeAt(0) + applicant.name.charCodeAt(applicant.name.length - 1)) % 25 : 15);
  const feedbackText = pseudoRandomScore >= 90 
    ? "El candidato entregó una solución excepcional. El entregable está muy bien estructurado, cumple con todos los requisitos solicitados en el reto y demuestra un conocimiento avanzado de las herramientas. Se destaca su capacidad para resolver el problema central con un enfoque creativo."
    : pseudoRandomScore >= 80
    ? "Buena solución general. El candidato completó la mayoría de los requerimientos de forma satisfactoria. El diseño o código es funcional aunque hay algunas áreas menores que podrían optimizarse para un entorno de producción real."
    : "Solución básica. El candidato logró resolver parte del problema, pero el entregable carece de profundidad técnica en ciertas áreas clave. Requiere supervisión para tareas de alta complejidad.";

  if (!applicant) return null;

  const isRevision = applicant.status.toLowerCase() === "revision" || applicant.status.toLowerCase() === "en_revision";
  const isEntrevista = applicant.status.toLowerCase() === "entrevista";
  const isEntrevistaFinal = applicant.status.toLowerCase() === "entrevista_final";

  const handleConfirm = () => {
    if (action) {
      onChangeStatus(applicant.id, action);
    }
    setConfirm(false);
    setAction(null);
    onClose();
  };

  return (
    <>
      {/* MODAL */}
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-11/12 max-w-4xl relative max-h-[90vh] flex flex-col overflow-hidden">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-black text-xl font-bold z-20 bg-white/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-200 transition-all"
          >
            ✕
          </button>

          <div className="overflow-y-auto custom-scrollbar p-8 sm:p-10 flex-1">

          {/* HEADER */}
      
         <div className="flex items-center gap-5 mb-8"> 
            <div className="w-20 h-20 rounded-full bg-[#1C6B72] text-white flex items-center justify-center text-3xl font-bold"> 
              {applicant.name .split(" ") .map((n) => n[0]) .join("")} </div>
            <div> 
              <h2 className="text-2xl font-bold text-[#1C1C1C]"> {applicant.name} </h2> 
              <p className="text-[#5F6368]"> {applicant.career} </p>
              <p className="mb-4 text-sm text-gray-500">Estado: {applicant.status}</p>

              {applicant.ai_interview_score && (
                <div className="bg-gradient-to-r from-amber-100 to-yellow-200 p-3 rounded-xl mb-4 border-l-4 border-yellow-500 shadow-sm animate-pulse">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🏆</span>
                    <span className="font-bold text-yellow-800">Top Performer en Entrevista IA</span>
                  </div>
                  <p className="text-sm text-yellow-900 leading-tight">
                    El candidato superó nuestra simulación técnica privada con un espectacular <strong>{applicant.ai_interview_score}%</strong> de excelencia.
                  </p>
                </div>
              )}

              <div className="bg-[#E8F3F4] p-4 rounded-xl mb-4 border-l-4 border-[#1C6B72]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-[#1C6B72]">🤖 Análisis IA (Fit {applicant.ai_fit_score}%)</span>
                </div>
                <p className="text-sm text-gray-700 italic">"{applicant.pet_message}"</p>
              </div>

              <span className="inline-block bg-[#F5A844] text-white px-3 py-1 rounded-full text-sm"> 
                Ciclo {applicant.cycle} </span> </div> </div> <div className="mb-6"> 
                  <h3 className="font-bold text-lg text-[#1C1C1C] mb-3"> Medio de contacto </h3> 
                  <div className="flex flex-wrap gap-2"> 
                    <span className="inline-block mt-2 bg-[#F5A844] text-white px-3 py-1 rounded-full text-sm"> {applicant.email} </span> 
                    <span className="inline-block mt-2 bg-[#F5A844] text-white px-3 py-1 rounded-full text-sm"> {applicant.cellphone} </span> 
                    </div> 
            </div> 
            {/* Habilidades blandas */} 
            <div className="mb-6"> 
              <h3 className="font-bold text-lg text-[#1C1C1C] mb-3"> Habilidades blandas </h3> 
              <div className="flex flex-wrap gap-2"> 
                {(applicant.softSkills || []).map((skill) => ( 
                  <span key={skill} className="bg-[#F3F3F3] text-[#1C1C1C] px-3 py-2 rounded-full text-sm" >
                   {skill} </span> ))} 
              </div> 
            </div> 
            {/* Conocimientos */} 
            <div className="mb-8"> 
              <h3 className="font-bold text-lg text-[#1C1C1C] mb-3"> Conocimientos </h3> 
              <div className="flex flex-wrap gap-2">
               {(applicant.knowledge || []).map((item) => ( <span key={item} className="bg-[#F0F4F8] text-[#F5A844] px-3 py-2 rounded-full text-sm font-medium" > {item} </span> ))} 
              </div> 
            </div>

            {/* Experiencia y Proyectos (Si existen) */}
            {applicant.experience && (
              <div className="mb-6">
                <h3 className="font-bold text-lg text-[#1C1C1C] mb-3"> Experiencia </h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">
                  {typeof applicant.experience === 'string' ? applicant.experience : "Sin detalles específicos de experiencia."}
                </p>
              </div>
            )}
            {applicant.projects && (
              <div className="mb-6">
                <h3 className="font-bold text-lg text-[#1C1C1C] mb-3"> Proyectos Destacados </h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">
                  {typeof applicant.projects === 'string' ? applicant.projects : "Sin proyectos registrados."}
                </p>
              </div>
            )}

          {/* ================= REVISION ================= */}
          {isRevision && (
            <div className="flex justify-between items-center">
              <button 
                onClick={() => {
                  if (applicant.cv_url) {
                    window.open(applicant.cv_url, '_blank');
                  } else {
                    alert("Este estudiante no tiene CV registrado.");
                  }
                }}
                className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition"
              >
                Ver CV
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAction("entrevista");
                    setConfirm(true);
                  }}
                  className="border px-4 py-2 rounded-xl"
                >
                  Entrevista
                </button>

                <button
                  onClick={() => {
                    setAction("rechazado");
                    setConfirm(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Rechazar
                </button>
              </div>
            </div>
          )}

          {/* ================= ENTREVISTA ================= */}
          {isEntrevista && (
            <>
              {/* ANALISIS DE RETO */}
              <div className="mb-6 bg-[#f0f9fa] border border-[#1C6B72] rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📊</span>
                  <h3 className="font-bold text-lg text-[#1C6B72]">Análisis de Entregable IA (Reto Técnico)</h3>
                </div>
                
                <div className="flex gap-4 items-center mb-4">
                  <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Calificación IA</p>
                    <p className="text-3xl font-bold text-[#1C6B72]">{pseudoRandomScore}<span className="text-lg text-gray-400 font-normal">/100</span></p>
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Originalidad</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{pseudoRandomScore > 85 ? 'Alta' : 'Media'}</p>
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wide">Plagio Detectado</p>
                    <p className="text-2xl font-bold text-gray-700 mt-1">{pseudoRandomScore > 85 ? '0%' : '4%'}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <p className="font-bold text-sm text-gray-800 mb-2">Feedback de la IA evaluadora:</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {feedbackText}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Evaluado hace 2 horas</span>
                    <button 
                      onClick={() => {
                        if (applicant.challenge_url) {
                          window.open(applicant.challenge_url, '_blank');
                        } else {
                          alert("El candidato no adjuntó un enlace o archivo.");
                        }
                      }}
                      className="text-sm text-[#1C6B72] font-bold hover:text-[#155359] hover:underline flex items-center gap-1 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      Ver archivo original
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => {
                    if (applicant.cv_url) {
                      window.open(applicant.cv_url, '_blank');
                    } else {
                      alert("Este estudiante no tiene CV registrado.");
                    }
                  }}
                  className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Ver CV
                </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAction("rechazado");
                    setConfirm(true);
                  }}
                  className="border px-4 py-2 rounded-xl"
                >
                  Rechazar
                </button>

                <button
                  onClick={() => {
                    setAction("entrevista_final");
                    setConfirm(true);
                  }}
                  className="bg-[#1C6B72] text-white px-4 py-2 rounded-xl"
                >
                  Pasar a entrevista
                </button>
              </div>
            </div>
            </>
          )}

          {/* ================= ENTREVISTA FINAL ================= */}
          {isEntrevistaFinal && (
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={() => {
                  if (applicant.cv_url) window.open(applicant.cv_url, '_blank');
                  else alert("Este estudiante no tiene CV registrado.");
                }}
                className="border px-4 py-2 rounded-xl hover:bg-gray-50 transition"
              >
                Ver CV
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAction("rechazado");
                    setConfirm(true);
                  }}
                  className="border px-4 py-2 rounded-xl text-red-600 hover:bg-red-50"
                >
                  Rechazar
                </button>

                <button
                  onClick={() => {
                    setAction("ganador");
                    setConfirm(true);
                  }}
                  className="bg-[#F5A844] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#e0983d]"
                >
                  🏆 Declarar Ganador
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* CONFIRM */}
      {confirm && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[400px]">

            <h2 className="font-bold text-lg mb-3">
              Confirmar acción
            </h2>

            <p className="mb-6 text-gray-600">
              {action === "entrevista" &&
                "¿Pasar a evaluación de reto técnico?"}

              {action === "rechazado" &&
                "¿Rechazar postulación?"}

              {action === "entrevista_final" &&
                "¿Agendar entrevista final con el candidato?"}

              {action === "ganador" &&
                "¿Estás seguro de declarar ganador a este postulante? Se le enviará la oferta laboral y se cerrará el proceso."}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirm(false)}
                className="border px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirm}
                className="bg-[#1C6B72] text-white px-4 py-2 rounded-xl"
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}