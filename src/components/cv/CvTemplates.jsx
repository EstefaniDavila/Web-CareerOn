import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import html2pdf from 'html2pdf.js';
import { FiDownload, FiSave, FiCheck, FiAlertTriangle } from 'react-icons/fi';

/* ─────────────────────────────────────────
   PLANTILLA 1 – "Harvard Classic"
   Una columna, serif, líneas negras finas.
   Estilo clásico de universidades top.
───────────────────────────────────────── */
function TemplateHarvard({ data }) {
  const { nombre, email, telefono, enlaces, experiencia, educacion, habilidades } = data.datos_extraidos || {};
  const resumen = data.cv_optimizado || '';

  return (
    <div className="bg-white text-gray-900 font-serif" style={{ minHeight: '1056px', padding: '56px 72px' }}>
      {/* Nombre */}
      <div className="text-center border-b-2 border-gray-900 pb-4 mb-4">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          {nombre || 'Tu Nombre Aquí'}
        </h1>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
          {email && <span>{email}</span>}
          {telefono && <><span className="text-gray-400">•</span><span>{telefono}</span></>}
          {enlaces && enlaces.filter(Boolean).map((link, i) => (
            <React.Fragment key={i}>
              <span className="text-gray-400">•</span>
              <span className="text-blue-700">{link}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Resumen */}
      {resumen && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-800">{resumen}</p>
        </section>
      )}

      {/* Experiencia */}
      {experiencia && experiencia.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h2>
          {experiencia.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <p className="font-bold text-sm">{exp.cargo}</p>
                <p className="text-xs text-gray-600 italic">{exp.fechas}</p>
              </div>
              <p className="text-sm text-gray-700 italic mb-1">{exp.empresa}</p>
              <p className="text-sm text-gray-800 leading-snug">{exp.descripcion}</p>
            </div>
          ))}
        </section>
      )}

      {/* Educación */}
      {educacion && educacion.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          {educacion.map((edu, i) => (
            <div key={i} className="flex justify-between items-baseline mb-2">
              <div>
                <p className="font-bold text-sm">{edu.titulo}</p>
                <p className="text-sm text-gray-700">{edu.institucion}</p>
              </div>
              <p className="text-xs text-gray-600 italic">{edu.fechas}</p>
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      {habilidades && habilidades.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-gray-800">{habilidades.join(' · ')}</p>
        </section>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   PLANTILLA 2 – "Tech Modern"
   Dos columnas. Barra lateral oscura con
   datos de contacto. Cuerpo principal blanco.
   Estilo FAANG/consultoras tech 2024.
───────────────────────────────────────── */
function TemplateTechModern({ data }) {
  const { nombre, email, telefono, enlaces, experiencia, educacion, habilidades } = data.datos_extraidos || {};
  const resumen = data.cv_optimizado || '';

  return (
    <div className="bg-white text-gray-900 flex" style={{ minHeight: '1056px', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white flex flex-col" style={{ width: '240px', minWidth: '240px', padding: '40px 24px' }}>
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white mb-4">
            {(nombre || 'U').charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold leading-tight text-white">{nombre || 'Tu Nombre'}</h1>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Contacto</h3>
          <div className="space-y-2 text-xs text-gray-300 break-words">
            {email && <p>✉ {email}</p>}
            {telefono && <p>📞 {telefono}</p>}
            {enlaces && enlaces.filter(Boolean).map((link, i) => (
              <p key={i} className="text-blue-300">🔗 {link}</p>
            ))}
          </div>
        </div>

        {habilidades && habilidades.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Skills</h3>
            <div className="flex flex-col gap-2">
              {habilidades.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {educacion && educacion.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Educación</h3>
            {educacion.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs font-bold text-white leading-tight">{edu.titulo}</p>
                <p className="text-xs text-gray-400">{edu.institucion}</p>
                <p className="text-xs text-gray-500">{edu.fechas}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {resumen && (
          <section className="mb-7">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 border-b border-indigo-100 pb-1 mb-3">
              Perfil Profesional
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{resumen}</p>
          </section>
        )}

        {experiencia && experiencia.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 border-b border-indigo-100 pb-1 mb-4">
              Experiencia Profesional
            </h2>
            <div className="space-y-5">
              {experiencia.map((exp, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-indigo-200">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-gray-900">{exp.cargo}</p>
                    <span className="text-xs text-white bg-indigo-500 px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">{exp.fechas}</span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 mb-1">{exp.empresa}</p>
                  <p className="text-sm text-gray-700 leading-snug">{exp.descripcion}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────
   PLANTILLA 3 – "Executive Clean"
   Una columna, barra superior con color,
   tipografía sans-serif moderna.
   Estilo de consultoras / big4.
───────────────────────────────────────── */
function TemplateExecutive({ data }) {
  const { nombre, email, telefono, enlaces, experiencia, educacion, habilidades } = data.datos_extraidos || {};
  const resumen = data.cv_optimizado || '';

  return (
    <div className="bg-white text-gray-900" style={{ minHeight: '1056px', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      {/* Header con color */}
      <header className="bg-slate-800 text-white" style={{ padding: '36px 56px' }}>
        <h1 className="text-4xl font-light tracking-tight mb-2">{nombre || 'Tu Nombre Aquí'}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-300 mt-3">
          {email && <span>✉ {email}</span>}
          {telefono && <span>📞 {telefono}</span>}
          {enlaces && enlaces.filter(Boolean).map((link, i) => (
            <span key={i} className="text-blue-300">🔗 {link}</span>
          ))}
        </div>
      </header>

      <div style={{ padding: '36px 56px' }}>
        {/* Resumen */}
        {resumen && (
          <section className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-3">
              Perfil Ejecutivo
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{resumen}</p>
          </section>
        )}

        {/* Experiencia */}
        {experiencia && experiencia.length > 0 && (
          <section className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-4">
              Trayectoria Profesional
            </h2>
            {experiencia.map((exp, i) => (
              <div key={i} className="mb-5 flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-slate-700 mt-1 flex-shrink-0"></div>
                  {i < experiencia.length - 1 && <div className="w-px bg-gray-300 flex-1 mt-1"></div>}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm text-gray-900">{exp.cargo}</p>
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{exp.fechas}</p>
                  </div>
                  <p className="text-sm text-slate-600 font-semibold mt-0.5">{exp.empresa}</p>
                  <p className="text-sm text-gray-700 leading-snug mt-1">{exp.descripcion}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Educación y Habilidades en 2 columnas */}
        <div className="grid grid-cols-2 gap-8">
          {educacion && educacion.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-3">Formación</h2>
              {educacion.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-bold text-sm">{edu.titulo}</p>
                  <p className="text-sm text-gray-600">{edu.institucion}</p>
                  <p className="text-xs text-gray-500">{edu.fechas}</p>
                </div>
              ))}
            </section>
          )}
          {habilidades && habilidades.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 mb-3">Competencias</h2>
              <div className="flex flex-wrap gap-2">
                {habilidades.map((skill, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COMPONENTE PRINCIPAL con selector
───────────────────────────────────────── */
const TEMPLATES = [
  {
    id: 'harvard',
    name: 'Harvard Classic',
    desc: 'Una columna · Serif · Universidades top',
    badge: '🎓 Tradicional',
    preview: 'bg-white border-2 border-gray-800',
    component: TemplateHarvard,
  },
  {
    id: 'tech',
    name: 'Tech Modern',
    desc: 'Dos columnas · Sidebar oscuro · FAANG/Startups',
    badge: '💻 Moderno',
    preview: 'bg-gray-900',
    component: TemplateTechModern,
  },
  {
    id: 'executive',
    name: 'Executive Clean',
    desc: 'Una columna · Header corporativo · Big 4',
    badge: '🏢 Ejecutivo',
    preview: 'bg-slate-800',
    component: TemplateExecutive,
  },
];

export default function CvTemplates({ data, onSaveToProfile }) {
  const [selected, setSelected] = useState('harvard');
  const [saved, setSaved] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const ActiveTemplate = TEMPLATES.find(t => t.id === selected)?.component;

  const handlePrint = () => {
    setShowPrint(true);
    // Pequeño delay para que React monte el portal antes de imprimir
    setTimeout(() => {
      window.print();
      // Limpiar el portal después de imprimir
      setTimeout(() => setShowPrint(false), 500);
    }, 150);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    
    // Generar PDF usando html2pdf en background
    const element = document.getElementById('cv-preview-container');
    const opt = {
      margin: 0,
      filename: `cv_optimizado_${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      const pdfBlob = await html2pdf().from(element).set(opt).output('blob');
      
      const formData = new FormData();
      formData.append('file', pdfBlob, opt.filename);
      
      const response = await fetch('http://localhost:8000/api/student/resume', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      if(result.status === 'success') {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error al guardar CV:", error);
      alert("Hubo un error al guardar tu CV en la base de datos.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full print:block">

      {/* ── Selector de plantillas ── */}
      <div className="grid grid-cols-3 gap-4 mb-8 print:hidden">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`rounded-2xl border-2 p-4 text-left transition-all hover:scale-[1.02] ${
              selected === t.id
                ? 'border-[var(--color-brand-primary)] shadow-lg shadow-blue-100'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Mini preview color */}
            <div className={`w-full h-20 rounded-lg mb-3 ${t.preview} flex items-end p-2`}>
              <div className="space-y-1 w-full">
                <div className={`h-1.5 rounded w-3/4 ${t.id === 'harvard' ? 'bg-gray-700' : 'bg-white opacity-70'}`}></div>
                <div className={`h-1 rounded w-1/2 ${t.id === 'harvard' ? 'bg-gray-400' : 'bg-white opacity-40'}`}></div>
                <div className={`h-1 rounded w-2/3 ${t.id === 'harvard' ? 'bg-gray-400' : 'bg-white opacity-40'}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm text-gray-900">{t.name}</span>
              {selected === t.id && (
                <span className="w-5 h-5 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center">
                  <FiCheck size={12} className="text-white" />
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">{t.desc}</span>
            <div className="mt-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t.badge}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Botones de acción ── */}
      <div className="flex flex-wrap gap-4 mb-8 justify-between items-center print:hidden">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">
            Plantilla: <span className="text-[var(--color-brand-primary)]">{TEMPLATES.find(t => t.id === selected)?.name}</span>
          </h3>
          <p className="text-sm text-gray-500">Tu información real fue extraída del PDF automáticamente.</p>
        </div>
        <div className="flex gap-3">
          <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                saved 
                  ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {saved ? (
                <><FiCheck /> Guardado en DB</>
              ) : isSaving ? (
                <span className="animate-pulse">Guardando...</span>
              ) : (
                <><FiSave /> Reemplazar CV Actual</>
              )}
            </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md"
          >
            <FiDownload /> Descargar PDF
          </button>
        </div>
      </div>

      {/* ── CV renderizado ── */}
      <div
        id="cv-print-container"
        className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200 print:shadow-none print:rounded-none print:border-none"
      >
        {ActiveTemplate && <ActiveTemplate data={data} />}
      </div>

      {/* ── Estilos de impresión ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Ocultar TODO lo que hay en la página */
          body > * {
            display: none !important;
          }
          /* Solo mostrar nuestro portal de impresión */
          #cv-print-portal {
            display: block !important;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 9999;
            background: white;
          }
          #cv-print-portal * {
            visibility: visible !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      ` }} />

      {/* ── Portal de impresión (fuera del flujo normal) ── */}
      {typeof document !== 'undefined' && showPrint &&
        ReactDOM.createPortal(
          <div id="cv-print-portal" style={{ display: 'none' }}>
            {ActiveTemplate && <ActiveTemplate data={data} />}
          </div>,
          document.body
        )
      }
    </div>
  );
}
