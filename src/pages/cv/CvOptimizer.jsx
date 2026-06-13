import React, { useState } from 'react';
import { FiFileText, FiAward, FiCheckCircle, FiCpu, FiLayout, FiChevronDown } from 'react-icons/fi';
import CvTemplates from '../../components/cv/CvTemplates';

export default function CvOptimizer() {
  const [analysis, setAnalysis] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Por favor, sube únicamente un archivo PDF.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Por favor, sube únicamente un archivo PDF.");
      }
    }
  };

  const handleOptimize = async () => {
    if (!file) {
      alert("Por favor, sube tu CV en formato PDF.");
      return;
    }
    setIsPending(true);
    setAnalysis(null);
    setShowTemplates(false);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("mock_token") || "dummy_token";
      const response = await fetch("http://localhost:8000/api/ai/optimize-cv-upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Error al procesar el PDF");
      }
      const responseData = await response.json();
      if (responseData && responseData.data) {
        setAnalysis(responseData.data);
        // Scroll suave a los resultados
        setTimeout(() => {
          document.getElementById("cv-results-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (error) {
      console.error("Error al optimizar:", error);
      alert(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full space-y-10">

      {/* ── Cabecera ── */}
      <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FiCpu size={32} />
            Coach Evolutivo: Optimizador de CV
          </h1>
          <p className="text-lg opacity-90 max-w-3xl">
            Sube tu currículum en PDF. La IA extrae tu información, la optimiza para filtros ATS (Applicant Tracking Systems) y te genera un nuevo CV profesional listo para descargar.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <FiFileText size={250} className="-mr-10 -mt-10" />
        </div>
      </div>

      {/* ── Zona de Subida (centrada) ── */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col w-full max-w-2xl">
          <label className="font-bold text-gray-700 mb-4 block text-center text-xl">
            📄 Sube tu Currículum (.pdf)
          </label>

          <div
            className={`w-full min-h-[220px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all p-6 text-center cursor-pointer
              ${isDragging ? 'border-[var(--color-brand-primary)] bg-blue-50 scale-[1.01]' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}
              ${file ? 'border-green-400 bg-green-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && document.getElementById('cv-upload-input').click()}
          >
            {file ? (
              <>
                <FiCheckCircle size={52} className="text-green-500 mb-3" />
                <h3 className="font-bold text-gray-900 text-lg mb-1">{file.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setAnalysis(null); setShowTemplates(false); }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium underline"
                >
                  Elegir otro archivo
                </button>
              </>
            ) : (
              <>
                <FiFileText size={52} className="text-gray-400 mb-3" />
                <h3 className="font-bold text-gray-700 text-lg mb-1">Arrastra tu PDF aquí</h3>
                <p className="text-sm text-gray-500 mb-5">o haz clic para seleccionarlo</p>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cv-upload-input"
                />
                <label
                  htmlFor="cv-upload-input"
                  className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 cursor-pointer shadow-sm transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  Examinar Archivos
                </label>
              </>
            )}
          </div>

          <button
            onClick={handleOptimize}
            disabled={!file || isPending}
            className="mt-6 w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-3 disabled:opacity-50 text-lg"
          >
            {isPending ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiAward size={22} />
            )}
            {isPending ? "Analizando con IA..." : "Subir y Analizar con IA"}
          </button>

          {isPending && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[var(--color-brand-primary)] animate-bounce">
              <FiChevronDown size={18} />
              <span className="text-sm font-medium">Los resultados aparecerán abajo</span>
              <FiChevronDown size={18} />
            </div>
          )}
        </div>
      </div>

      {/* ── Resultados (aparecen debajo, ancho completo) ── */}
      {(isPending || analysis) && (
        <div id="cv-results-section" className="w-full animate-in fade-in slide-in-from-bottom-4">

          {isPending && (
            <div className="flex flex-col items-center justify-center text-[var(--color-brand-primary)] text-center py-16 animate-pulse">
              <FiCpu size={72} className="mb-4" />
              <p className="font-semibold text-lg">Claude está leyendo tu CV...</p>
              <p className="text-sm text-gray-500 mt-1">Extrayendo experiencia, educación y generando mejoras</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-8">

              {/* Score + Feedback */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-3 ${
                    analysis.score >= 80 ? 'bg-green-100 text-green-600' :
                    analysis.score >= 50 ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {analysis.score}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Score ATS</h3>
                  <p className="text-sm text-gray-500 mt-1">Evaluado por el Coach Evolutivo</p>
                </div>

                <div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col justify-center">
                  <h4 className="font-bold text-blue-900 mb-2 text-lg">💬 Feedback General</h4>
                  <p className="text-blue-800 leading-relaxed">{analysis.feedback_general}</p>
                </div>
              </div>

              {/* Sugerencias */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                  <FiCheckCircle className="text-green-500" size={20} />
                  Sugerencias de Mejora
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {analysis.mejoras.map((mejora, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm">
                      <strong className="text-[var(--color-brand-primary)] block mb-1">{mejora.seccion}</strong>
                      <span className="text-gray-700">{mejora.sugerencia}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen optimizado editable */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center justify-between text-lg">
                  <span>CV Optimizado (Resumen Profesional)</span>
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">✏️ Editable</span>
                </h4>
                <textarea
                  className="w-full bg-gray-900 text-green-400 p-5 rounded-xl font-mono text-sm leading-relaxed shadow-inner border border-transparent focus:border-green-500 focus:outline-none resize-y min-h-[180px] transition-all"
                  value={analysis.cv_optimizado}
                  onChange={(e) => setAnalysis({ ...analysis, cv_optimizado: e.target.value })}
                />
              </div>

              {/* Botón generar CV */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowTemplates(true);
                    setTimeout(() => {
                      document.getElementById("cv-template-section")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] text-white font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] text-xl"
                >
                  <FiLayout size={24} /> ✨ Generar Mi Nuevo CV Profesional
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ── Selector de Plantillas y CV Final ── */}
      {showTemplates && analysis && (
        <div id="cv-template-section" className="animate-in fade-in slide-in-from-bottom-4 border-t-2 border-gray-100 pt-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Elige tu Plantilla</h2>
            <p className="text-gray-500">Selecciona el diseño que más te guste. Tu información ya está cargada.</p>
          </div>
          <CvTemplates
            data={analysis}
            onSaveToProfile={() => {
              alert("¡Tu CV Optimizado ha sido guardado en tu perfil CareerOn para que los reclutadores lo vean!");
            }}
          />
        </div>
      )}

    </div>
  );
}
