import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCrud from "../hooks/useCrud";

const MockInterview = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const mode = jobId ? "job_specific" : "practice";
  const { insertModel } = useCrud("/api/interview");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const transcriptRef = useRef("");

  const [stream, setStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false }); // Audio vía speech recognition
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
      }
    };

    startCamera();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "es-ES";

      rec.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(" ");
        setTranscript(currentTranscript);
        transcriptRef.current = currentTranscript;
      };

      setRecognition(rec);
    } else {
      console.warn("Speech Recognition no está soportado en este navegador.");
    }

    const startInterview = async () => {
      setIsProcessing(true);
      try {
        const res = await insertModel({
          mode: mode,
          job_id: jobId ? parseInt(jobId) : null
        }, "/api/interview/start");
        if (res.status === "success") {
          setMessages([
            { role: "model", content: res.first_question }
          ]);
          speakText(res.first_question);
        }
      } catch (err) {
        console.error("Error iniciando entrevista:", err);
      } finally {
        setIsProcessing(false);
      }
    };

    startInterview();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.5);
  };

  const handleToggleRecording = () => {
    if (!recognition) return alert("Tu navegador no soporta reconocimiento de voz. Intenta en Chrome.");

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      handleSendResponse(transcriptRef.current);
    } else {
      setTranscript("");
      transcriptRef.current = "";
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleSendResponse = async (finalTranscript) => {
    if (!finalTranscript || !finalTranscript.trim()) {
      alert("No detecté tu voz. Intenta hablar un poco más fuerte o usa la caja de texto debajo del chat si tu micrófono falla.");
      return;
    }

    const frame = captureFrame();
    const images = frame ? [frame] : [];

    const newHistory = [
      ...messages,
      { role: "user", content: finalTranscript, images: images }
    ];
    setMessages(newHistory);
    setTranscript("");
    setIsProcessing(true);

    try {
      const res = await insertModel({
        history: newHistory,
        job_context: mode === "job_specific" ? `Job ID: ${jobId}` : null
      }, "/api/interview/message");

      if (res.status === "success") {
        setMessages([
          ...newHistory,
          { role: "model", content: res.reply }
        ]);
        speakText(res.reply);
      }
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinish = async () => {
    setIsProcessing(true);
    try {
      const res = await insertModel({
        history: messages,
        job_context: mode === "job_specific" ? `Job ID: ${jobId}` : null
      }, "/api/interview/finish");
      if (res.status === "success") {
        setIsFinished(true);
        setEvaluation(res);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    } catch (err) {
      console.error("Error al finalizar:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#F8F9FA] p-6 relative">
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col gap-4">

        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <div>
            <h1 className="text-xl font-semibold text-[#1C1C1C]">
              Entrevista con IA {mode === "job_specific" ? "(Específica)" : "(Práctica General)"}
            </h1>
            <p className="text-sm text-[#5F6368]">El Coach analizará tus respuestas y lenguaje corporal.</p>
          </div>
          <button
            onClick={handleFinish}
            disabled={isProcessing || isFinished}
            className="px-4 py-2 bg-[#ED7B32] text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50"
          >
            Finalizar Entrevista
          </button>
        </div>

        {!isFinished && (
          <div className="bg-[#E8E4FD] border border-[#1C6B72] text-[#4A2BC4] px-4 py-3 rounded-xl shadow-sm flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-bold text-sm mb-1">¿Cómo funciona esta entrevista?</p>
              <ul className="text-xs space-y-1 ml-4 list-disc">
                <li>Espera a que el Coach te haga la primera pregunta.</li>
                <li>Mantén presionado el botón morado <strong>"Mantén presionado para hablar"</strong>.</li>
                <li>Habla claramente hacia el micrófono y <strong>mira a la cámara</strong>. Al soltar el botón, tu respuesta y gestos serán analizados.</li>
              </ul>
            </div>
          </div>
        )}

        {!isFinished ? (
          <div className="flex flex-1 gap-4 overflow-hidden">
            <div className="w-1/2 bg-black rounded-2xl overflow-hidden relative shadow-lg flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100" // Espejo
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <button
                  onMouseDown={handleToggleRecording}
                  onMouseUp={handleToggleRecording}
                  onTouchStart={handleToggleRecording}
                  onTouchEnd={handleToggleRecording}
                  disabled={isProcessing}
                  className={`px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-all transform active:scale-95 flex items-center gap-2 ${isRecording ? "bg-red-500 animate-pulse" : "bg-[#1C6B72] hover:bg-[#4A2BC4]"
                    }`}
                >
                  {isRecording ? "🔴 Grabando (Suelta para enviar)" : "🎤 Mantén presionado para hablar"}
                </button>
              </div>

              {isRecording && (
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-sm max-w-[80%] text-center backdrop-blur-sm">
                  {transcript || "Escuchando..."}
                </div>
              )}
            </div>

            <div className="w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8E4FD] flex items-center justify-center text-xl">🤖</div>
                <div>
                  <p className="font-semibold text-[#1C1C1C]">Coach Entrevistador</p>
                  <p className="text-xs text-green-600 font-medium">En línea</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"
                      ? "bg-[#1C6B72] text-white rounded-br-none"
                      : "bg-gray-100 text-[#1C1C1C] rounded-bl-none"
                      }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-[#5F6368] rounded-2xl rounded-bl-none px-4 py-3 animate-pulse">
                      Analizando respuesta y lenguaje corporal...
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="O escribe tu respuesta aquí si el micrófono falla..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-[#1C6B72] text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim() && !isProcessing) {
                      handleSendResponse(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling;
                    if (input.value.trim() && !isProcessing) {
                      handleSendResponse(input.value);
                      input.value = '';
                    }
                  }}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-[#1C6B72] text-white rounded-xl text-sm font-semibold hover:bg-[#4A2BC4] disabled:opacity-50"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Entrevista Finalizada</h2>
            <p className="text-[#5F6368] max-w-2xl mb-8">
              {evaluation?.evaluation?.feedback}
            </p>

            <div className="flex gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 w-48">
                <p className="text-sm text-[#5F6368] font-medium mb-1">Puntuación</p>
                <p className="text-4xl font-bold text-[#1C6B72]">{evaluation?.evaluation?.score}/100</p>
              </div>
              <div className="bg-[#FFF4E5] p-6 rounded-2xl border border-[#FFE0B2] w-48">
                <p className="text-sm text-[#E65100] font-medium mb-1">Monedas Ganadas</p>
                <p className="text-4xl font-bold text-[#FF9800]">+{evaluation?.rewards?.coins}</p>
              </div>
              <div className="bg-[#E8F5E9] p-6 rounded-2xl border border-[#C8E6C9] w-48">
                <p className="text-sm text-[#2E7D32] font-medium mb-1">XP Ganado</p>
                <p className="text-4xl font-bold text-[#4CAF50]">+{evaluation?.rewards?.xp}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#1C6B72] text-white rounded-xl font-medium hover:bg-[#4A2BC4] transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterview;
