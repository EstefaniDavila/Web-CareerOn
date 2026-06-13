import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/LeftSidebar';
import CvOptimizer from '../cv/CvOptimizer';
import { FiCpu, FiBriefcase, FiFolder, FiFileText, FiUploadCloud, FiEdit3 } from 'react-icons/fi';

const Profile = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modales
  const [showExpModal, setShowExpModal] = useState(false);
  const [showProjModal, setShowProjModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/student/profile');
      const result = await response.json();
      if (result.status === 'success') {
        setProfileData(result.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    await fetch('http://localhost:8000/api/student/experience', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setShowExpModal(false);
    fetchProfile();
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    await fetch('http://localhost:8000/api/student/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setShowProjModal(false);
    fetchProfile();
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    await fetch('http://localhost:8000/api/student/skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setShowSkillModal(false);
    fetchProfile();
  };

  const handleDirectUploadCV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await fetch('http://localhost:8000/api/student/resume', {
        method: 'POST',
        body: formData,
      });
      // Recargar perfil para mostrar el nuevo CV
      await fetchProfile();
    } catch (error) {
      console.error("Error subiendo CV directamente:", error);
      alert("Hubo un error al subir el CV.");
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 w-full items-start">
      {/* Sidebar Izquierda — sticky */}
      <div className="hidden lg:block shrink-0 self-start sticky top-[88px]">
        <LeftSidebar />
      </div>

      {/* Contenido Central */}
      <div className="flex-1 min-w-0 pb-12">
        
        {/* Renderizado Condicional */}
        {activeView === 'dashboard' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header / Saludo */}
            <div className="bg-gradient-to-r from-[var(--color-brand-hover)] to-[var(--color-brand-primary)] rounded-2xl shadow-md p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-accent)]">
                  <FiCpu size={28} />
                  <span className="font-bold text-lg">Coach Evolutivo AI</span>
                </div>
                <h1 className="text-3xl font-black mb-2">¡Hola, {profileData?.user?.name.split(' ')[0] || 'Estudiante'}!</h1>
                <p className="text-gray-300 max-w-2xl text-lg">
                  Soy tu coach de empleabilidad. He analizado tu perfil y el mercado laboral. ¿Qué deseas hacer hoy para potenciar tu carrera?
                </p>
              </div>
              <FiCpu className="absolute -right-10 -bottom-10 text-white opacity-5" size={200} />
            </div>

            {/* Acciones Principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveView('optimizer')}
                className="bg-white hover:border-[var(--color-brand-primary)] border-2 border-transparent shadow-sm rounded-2xl p-6 text-left transition-all group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-[#1C6B72]/10 text-[var(--color-brand-primary)]">
                  <FiFileText size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Optimizar tu CV</h3>
                <p className="text-gray-500 text-sm">Usa la IA para adaptar tu currículum a los filtros ATS y empresas TOP.</p>
              </button>

              <button onClick={() => setShowProjModal(true)} className="bg-white hover:border-[var(--color-brand-accent)] border-2 border-transparent shadow-sm rounded-2xl p-6 text-left transition-all group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-[#ED7B32]/10 text-[var(--color-brand-accent)]">
                  <FiFolder size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Agregar Proyectos</h3>
                <p className="text-gray-500 text-sm">Destaca tus mejores proyectos prácticos o de laboratorio.</p>
              </button>

              <button onClick={() => setShowExpModal(true)} className="bg-white hover:border-[var(--color-brand-cards)] border-2 border-transparent shadow-sm rounded-2xl p-6 text-left transition-all group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-[#F5A844]/20 text-[var(--color-brand-cards)]">
                  <FiBriefcase size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Tu Experiencia</h3>
                <p className="text-gray-500 text-sm">Actualiza tu historial laboral o prácticas pre-profesionales.</p>
              </button>
            </div>

            {/* Información Actual del Usuario */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              
              {/* Experiencia Laboral */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <FiBriefcase className="text-gray-400"/> Experiencia
                  </h3>
                  <button onClick={() => setShowExpModal(true)} className="text-[var(--color-brand-accent)] hover:bg-[#ED7B32]/10 p-2 rounded-lg transition-colors"><FiEdit3 /></button>
                </div>
                
                {loading ? <p className="text-gray-400">Cargando...</p> : 
                 profileData?.experiences?.length > 0 ? (
                  <div className="space-y-6">
                    {profileData.experiences.map((exp, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-gray-100">
                        <div className="absolute w-3 h-3 bg-[var(--color-brand-primary)] rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
                        <h4 className="font-bold text-gray-900">{exp.position}</h4>
                        <p className="text-[var(--color-brand-primary)] font-medium text-sm mb-1">{exp.company_name}</p>
                        <p className="text-gray-500 text-xs mb-2">{exp.start_date} - {exp.end_date || 'Presente'} • {exp.employment_type}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Aún no has agregado experiencia laboral.</p>
                )}
              </div>

              {/* Columna Derecha: Proyectos y CV */}
              <div className="space-y-6">
                
                {/* CV Actual */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <FiFileText className="text-gray-400"/> CV Actual
                    </h3>
                  </div>
                  {loading ? <p className="text-gray-400">Cargando...</p> : 
                   profileData?.current_cv ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1C6B72]/10 text-[var(--color-brand-primary)] rounded-lg flex items-center justify-center">
                          <FiFileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{profileData.current_cv.title}</p>
                          <p className="text-xs text-gray-500">Documento Activo (Default)</p>
                        </div>
                      </div>
                      <a href={profileData.current_cv.file_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--color-brand-primary)] hover:underline">Ver</a>
                    </div>
                  ) : (
                    <div className="bg-[#ED7B32]/5 border border-[#ED7B32]/30 rounded-xl p-4 flex flex-col items-start gap-4 text-[#C45E1E]">
                      <div className="flex items-center gap-3 w-full">
                        <FiUploadCloud size={32} />
                        <p className="text-sm font-medium">Aún no tienes un CV guardado. Puedes subir tu CV original si consideras que ya está perfecto, o usar nuestra IA para optimizarlo.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <label className="cursor-pointer bg-white border border-[#ED7B32]/40 text-[#ED7B32] font-bold px-4 py-2 rounded-lg hover:bg-[#ED7B32]/10 transition-colors text-sm text-center">
                          Subir mi CV directo
                          <input type="file" accept=".pdf" className="hidden" onChange={handleDirectUploadCV} />
                        </label>
                        <button 
                          onClick={() => setActiveView('optimizer')}
                          className="bg-[var(--color-brand-primary)] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#132E41] transition-colors text-sm"
                        >
                          Usar Coach Evolutivo IA
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Proyectos */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <FiFolder className="text-gray-400"/> Proyectos
                    </h3>
                    <button onClick={() => setShowProjModal(true)} className="text-[var(--color-brand-accent)] hover:bg-[#ED7B32]/10 p-2 rounded-lg transition-colors"><FiEdit3 /></button>
                  </div>
                  {loading ? <p className="text-gray-400">Cargando...</p> : 
                   profileData?.projects?.length > 0 ? (
                    <div className="space-y-4">
                      {profileData.projects.map((proj, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-[var(--color-brand-primary)] transition-colors">
                          <h4 className="font-bold text-gray-900 mb-1">{proj.title}</h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{proj.description}</p>
                          {proj.repository_url && (
                            <a href={proj.repository_url} target="_blank" rel="noreferrer" className="text-[var(--color-brand-primary)] text-xs font-bold hover:underline">
                              Enlace al proyecto →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">Aún no has agregado proyectos destacados.</p>
                  )}
                </div>

                {/* Habilidades e Idiomas */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <FiCpu className="text-gray-400"/> Habilidades e Idiomas
                    </h3>
                    <button onClick={() => setShowSkillModal(true)} className="text-[var(--color-brand-accent)] hover:bg-[#ED7B32]/10 p-2 rounded-lg transition-colors"><FiEdit3 /></button>
                  </div>
                  {loading ? <p className="text-gray-400">Cargando...</p> : (
                    <div className="space-y-4">
                      {profileData?.skills?.length > 0 || profileData?.languages?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {profileData?.skills?.map((skill, idx) => (
                            <span key={`s-${idx}`} className="bg-[#1C6B72]/10 text-[var(--color-brand-primary)] border border-[#1C6B72]/20 px-3 py-1 rounded-full text-xs font-bold">
                              {skill.Skill?.name || skill.name} ({skill.level})
                            </span>
                          ))}
                          {profileData?.languages?.map((lang, idx) => (
                            <span key={`l-${idx}`} className="bg-[#ED7B32]/10 text-[var(--color-brand-accent)] border border-[#ED7B32]/20 px-3 py-1 rounded-full text-xs font-bold">
                              {lang.Language?.name || lang.name} ({lang.level})
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm italic">Aún no has agregado habilidades ni idiomas.</p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <button 
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-gray-500 hover:text-[var(--color-brand-primary)] font-bold flex items-center gap-2 transition-colors"
            >
              ← Volver al Coach
            </button>
            <CvOptimizer />
          </div>
        )}

        {/* MODALES */}
        {showExpModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-4">Agregar Experiencia</h3>
              <form onSubmit={handleAddExperience} className="space-y-4">
                <input required name="company_name" placeholder="Empresa" className="w-full border p-2 rounded" />
                <input required name="position" placeholder="Cargo" className="w-full border p-2 rounded" />
                <input required name="employment_type" placeholder="Tipo (ej. Full-time, Prácticas)" className="w-full border p-2 rounded" />
                <div className="flex gap-2">
                  <input required name="start_date" type="date" className="w-full border p-2 rounded" />
                  <input name="end_date" type="date" className="w-full border p-2 rounded" />
                </div>
                <textarea required name="description" placeholder="Descripción de tus logros..." className="w-full border p-2 rounded h-24"></textarea>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowExpModal(false)} className="flex-1 p-2 bg-gray-100 font-bold rounded">Cancelar</button>
                  <button type="submit" className="flex-1 p-2 bg-[var(--color-brand-primary)] text-white font-bold rounded">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showProjModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-4">Agregar Proyecto</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <input required name="title" placeholder="Título del Proyecto" className="w-full border p-2 rounded" />
                <input name="repository_url" placeholder="Enlace (Opcional)" className="w-full border p-2 rounded" />
                <textarea required name="description" placeholder="Descripción..." className="w-full border p-2 rounded h-24"></textarea>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowProjModal(false)} className="flex-1 p-2 bg-gray-100 font-bold rounded">Cancelar</button>
                  <button type="submit" className="flex-1 p-2 bg-[var(--color-brand-primary)] text-white font-bold rounded">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showSkillModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-in zoom-in-95">
              <h3 className="text-xl font-bold mb-4">Agregar Habilidad / Idioma</h3>
              <form onSubmit={handleAddSkill} className="space-y-4">
                <input required name="name" placeholder="Nombre (ej. Python, Inglés)" className="w-full border p-2 rounded" />
                <select required name="level" className="w-full border p-2 rounded">
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowSkillModal(false)} className="flex-1 p-2 bg-gray-100 font-bold rounded">Cancelar</button>
                  <button type="submit" className="flex-1 p-2 bg-[var(--color-brand-primary)] text-white font-bold rounded">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
