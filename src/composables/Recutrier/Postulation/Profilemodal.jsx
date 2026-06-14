import React, { useState } from "react";

export default function ProfileModal({
  applicant,
  onClose,
  onChangeStatus,
}) {
  const [action, setAction] = useState(null);
  const [confirm, setConfirm] = useState(false);

  if (!applicant) return null;

  const isRevision = applicant.status === "revision";
  const isEntrevista = applicant.status === "entrevista";

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
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center pt-12">
        <div className="bg-white rounded-3xl shadow-2xl w-1/3 max-w-2xl p-8 relative">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl"
          >
            ✕
          </button>

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
                {applicant.softSkills.map((skill) => ( 
                  <span key={skill} className="bg-[#F3F3F3] text-[#1C1C1C] px-3 py-2 rounded-full text-sm" >
                   {skill} </span> ))} 
              </div> 
            </div> 
            {/* Conocimientos */} 
            <div className="mb-8"> 
              <h3 className="font-bold text-lg text-[#1C1C1C] mb-3"> Conocimientos </h3> 
              <div className="flex flex-wrap gap-2">
               {applicant.knowledge.map((item) => ( <span key={item} className="bg-[#F0F4F8] text-[#F5A844] px-3 py-2 rounded-full text-sm font-medium" > {item} </span> ))} 
              </div> 
            </div>

          {/* ================= REVISION ================= */}
          {isRevision && (
            <div className="flex justify-between items-center">
              <button className="border px-4 py-2 rounded-xl">
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
            <div className="flex justify-between items-center">
              <button className="border px-4 py-2 rounded-xl">
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
                    setAction("ganador");
                    setConfirm(true);
                  }}
                  className="bg-[#1C6B72] text-white px-4 py-2 rounded-xl"
                >
                  Elegir ganador
                </button>
              </div>
            </div>
          )}
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
                "¿Pasar a entrevista?"}

              {action === "rechazado" &&
                "¿Rechazar postulación?"}

              {action === "ganador" &&
                "¿Seleccionar como ganador?"}
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