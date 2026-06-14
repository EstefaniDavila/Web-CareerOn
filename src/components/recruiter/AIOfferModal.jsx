import React, { useState, useEffect, useRef } from "react";
import useCrud from "../../hooks/useCrud";

const AIOfferModal = ({ isOpen, onClose, onGenerated, availableSkills }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState(null);
  
  const transcriptRef = useRef("");
  const { insertModel } = useCrud("/api/recruiter");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "es-ES";

      rec.onresult = (event) => {
        let current = "";
        for (let i = 0; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscript(current);
        transcriptRef.current = current;
      };

      setRecognition(rec);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) {
      alert("Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      transcriptRef.current = "";
      try {
        recognition.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleGenerate = async () => {
    if (!transcript.trim()) {
      alert("Por favor, dicta los requisitos primero.");
      return;
    }
    
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    }

    setIsProcessing(true);
    try {
      const res = await insertModel({ prompt: transcript }, "/api/recruiter/generate_offer");
      if (res.status === "success" && res.data) {
        onGenerated(res.data);
      } else {
        alert(res.message || "Error al generar la oferta");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error comunicándose con la IA.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#1C6B72] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <span>✨</span> Generar con IA
          </h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">
          <div className="text-center">
            <p className="text-[#5F6368] text-sm mb-4">
              Presiona el micrófono y cuéntame qué perfil estás buscando. Intentaré usar las habilidades que ya tenemos o crearé nuevas si es necesario.
            </p>
            
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording 
                  ? "bg-red-100 text-red-500 animate-pulse border-4 border-red-200" 
                  : "bg-[#F0F4F8] text-[#1C6B72] hover:bg-[#E1F5EE]"
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
            <p className="text-xs font-semibold mt-2 text-[#1C1C1C]">
              {isRecording ? "Escuchando..." : "Hacer clic para hablar"}
            </p>
          </div>

          <div className="bg-[#F9FAFB] border border-gray-100 rounded-xl p-4 min-h-[100px] text-sm text-[#1C1C1C]">
            {transcript ? transcript : <span className="text-gray-400 italic">"Busco un desarrollador backend con 3 años de experiencia en Python..."</span>}
          </div>

          {availableSkills && availableSkills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#5F6368] mb-2">Habilidades disponibles en el sistema:</p>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar">
                {availableSkills.slice(0, 30).map(s => (
                  <span key={s.id} className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    {s.name}
                  </span>
                ))}
                {availableSkills.length > 30 && <span className="text-[10px] text-gray-400 py-1">...y más</span>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
          <span className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full flex items-center gap-1">
            <span>🪙</span> Costo: 2 Monedas
          </span>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#5F6368] hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isProcessing}
            >
              Cancelar
            </button>
            <button
              onClick={handleGenerate}
              disabled={isProcessing || !transcript.trim()}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#1D9E75] hover:bg-[#0F6E56] rounded-lg transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                "Generar Oferta"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOfferModal;
