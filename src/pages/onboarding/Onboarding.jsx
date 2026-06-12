import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiBriefcase, FiArrowLeft, FiSend, FiCheck, FiChevronRight } from "react-icons/fi";
import api from "../../services/api";
import { useUserStatus } from "../../hooks/useUserStatus";

const CAREERS = [
  "Ingeniería de Sistemas e Informática", "Ingeniería de Software", "Ingeniería Industrial",
  "Ingeniería Civil", "Administración de Empresas", "Contabilidad y Finanzas",
  "Marketing", "Derecho", "Psicología", "Ciencias de la Comunicación", "Arquitectura",
];

const GOALS = [
  { id: "ppp", label: "📋 Práctica Pre-Profesional", desc: "Busco mis primeras prácticas como parte de mi formación" },
  { id: "pp", label: "🎯 Práctica Profesional", desc: "Ya tengo experiencia y busco prácticas avanzadas" },
  { id: "first_job", label: "💼 Conseguir mi primer empleo", desc: "Estoy listo para trabajar a tiempo completo" },
  { id: "target_company", label: "🏢 Entrar a una empresa específica", desc: "Tengo una empresa soñada en mente" },
  { id: "switch_area", label: "🔄 Cambiar de área profesional", desc: "Quiero explorar nuevos horizontes" },
  { id: "startup", label: "🚀 Emprender mi propio negocio", desc: "Quiero crear algo propio" },
];

const EXP_TYPES = [
  { id: "work", label: "💼 Laboral", desc: "He trabajado formal o informalmente" },
  { id: "volunteering", label: "🤝 Voluntariado", desc: "Proyectos sociales o comunitarios" },
  { id: "freelance", label: "💻 Freelance", desc: "Proyectos independientes" },
];

const AREAS = [
  "Desarrollo de Software", "Data Science / IA", "Ciberseguridad", "Cloud Computing",
  "Marketing Digital", "Finanzas", "Gestión de Proyectos", "Diseño UX/UI",
  "Recursos Humanos", "Ventas", "Consultoría",
];

export default function Onboarding() {
  const { accounts } = useMsal();
  const navigate = useNavigate();
  const userEmail = accounts[0]?.username || "";
  const userName = accounts[0]?.name || "Usuario";

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(null); // 'student' | 'recruiter' | null
  const { userType, loading: statusLoading } = useUserStatus();
  
  // Si ya completó el onboarding, enviarlo al dashboard
  if (userType === "Student" || userType === "Company") {
    navigate("/dashboard", { replace: true });
    return null;
  }
  
  // Student State
  const [studentStep, setStudentStep] = useState(1); // 1: Academic, 2: Goal, 3: Experience
  const [career, setCareer] = useState("");
  const [semester, setSemester] = useState("");
  const [goal, setGoal] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [hasExperience, setHasExperience] = useState(null);
  const [experienceType, setExperienceType] = useState("");
  const [hasProjects, setHasProjects] = useState(null);
  const [interestArea, setInterestArea] = useState("");

  // Recruiter State
  const [recruiterStep, setRecruiterStep] = useState(1); // 1: Info, 2: Code
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [code, setCode] = useState("");

  const submitStudent = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/student", {
        email: userEmail,
        career,
        semester: parseInt(semester),
        goal,
        has_experience: hasExperience || false,
        experience_type: hasExperience ? experienceType : null,
        has_projects: hasProjects || false,
        target_company: goal === "target_company" ? targetCompany : null,
        interest_area: interestArea || null,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Hubo un error al guardar tu perfil. Revisa la consola.");
    }
    setLoading(false);
  };

  const submitRecruiterCode = async () => {
    setLoading(true);
    try {
      await api.post("/onboarding/recruiter/request-code", {
        email: userEmail,
        company_name: companyName,
        job_title: jobTitle,
        corporate_email: corporateEmail,
      });
      setRecruiterStep(2);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al pedir el código. ¿Corriste el SQL en Supabase?");
    }
    setLoading(false);
  };

  const verifyRecruiter = async () => {
    setLoading(true);
    try {
      await api.post(`/onboarding/recruiter/verify`, { email: userEmail, code });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Código incorrecto o hubo un error en Supabase.");
    }
    setLoading(false);
  };

  // --- RENDERS ---

  if (statusLoading) {
    return (
      <div className="min-h-screen w-full bg-[var(--color-brand-bg)] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-brand-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)] flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-5xl font-bold text-white mb-4">¡Hola, {userName.split(' ')[0]}!</h1>
            <p className="text-xl text-white/90 font-light">Elige tu camino para iniciar tu experiencia en CarrerOn.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button onClick={() => setRole("student")} className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl text-left hover:bg-white hover:scale-105 transition-all duration-500 group">
              <div className="w-20 h-20 bg-white/20 group-hover:bg-blue-50 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <FiUser size={40} className="text-white group-hover:text-[var(--color-brand-primary)] transition-colors" />
              </div>
              <h2 className="text-3xl font-bold text-white group-hover:text-[var(--color-brand-text)] mb-3 transition-colors">Estudiante</h2>
              <p className="text-white/80 group-hover:text-[var(--color-brand-subtext)] text-lg transition-colors">
                Construye tu ruta de empleabilidad, optimiza tu CV y desbloquea oportunidades.
              </p>
            </button>
            <button onClick={() => setRole("recruiter")} className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl text-left hover:bg-white hover:scale-105 transition-all duration-500 group">
              <div className="w-20 h-20 bg-white/20 group-hover:bg-orange-50 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <FiBriefcase size={40} className="text-white group-hover:text-[var(--color-brand-accent)] transition-colors" />
              </div>
              <h2 className="text-3xl font-bold text-white group-hover:text-[var(--color-brand-text)] mb-3 transition-colors">Reclutador</h2>
              <p className="text-white/80 group-hover:text-[var(--color-brand-subtext)] text-lg transition-colors">
                Encuentra talento preparado para la industria y conecta con candidatos UTP.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (role === "student") {
    return (
      <div className="min-h-screen w-full bg-[var(--color-brand-bg)] flex flex-col justify-center py-12 px-6">
        <div className="max-w-2xl w-full mx-auto">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${s <= studentStep ? 'bg-[var(--color-brand-primary)]' : 'bg-gray-200'}`} />
            ))}
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl animate-fadeIn">
            <button onClick={() => studentStep > 1 ? setStudentStep(s => s - 1) : setRole(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
              <FiArrowLeft /> Volver
            </button>

            {studentStep === 1 && (
              <div className="animate-slideUp">
                <h2 className="text-3xl font-bold text-[var(--color-brand-text)] mb-2">Tu Perfil Académico</h2>
                <p className="text-[var(--color-brand-subtext)] mb-8">Vamos a configurar la base para tu ruta de empleabilidad.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Carrera</label>
                    <select value={career} onChange={e => setCareer(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-primary)] outline-none">
                      <option value="">Selecciona tu carrera</option>
                      {CAREERS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Ciclo</label>
                    <select value={semester} onChange={e => setSemester(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-primary)] outline-none">
                      <option value="">Selecciona tu ciclo</option>
                      {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>Ciclo {i + 1}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => setStudentStep(2)} disabled={!career || !semester} className="mt-10 w-full bg-[var(--color-brand-primary)] text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all">
                  Siguiente Paso <FiChevronRight />
                </button>
              </div>
            )}

            {studentStep === 2 && (
              <div className="animate-slideUp">
                <h2 className="text-3xl font-bold text-[var(--color-brand-text)] mb-2">¿Cuál es tu meta principal?</h2>
                <p className="text-[var(--color-brand-subtext)] mb-8">Adaptaremos tus misiones basadas en este objetivo.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {GOALS.map(g => (
                    <button key={g.id} onClick={() => setGoal(g.id)} className={`text-left p-4 rounded-xl border-2 transition-all ${goal === g.id ? 'border-[var(--color-brand-primary)] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                      <div className="font-bold text-[var(--color-brand-text)]">{g.label}</div>
                      <div className="text-xs text-[var(--color-brand-subtext)] mt-1">{g.desc}</div>
                    </button>
                  ))}
                </div>

                {goal === "target_company" && (
                  <div className="mb-6 animate-fadeIn">
                    <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Empresa Objetivo</label>
                    <input type="text" value={targetCompany} onChange={e => setTargetCompany(e.target.value)} placeholder="Ej. Google, BCP..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-primary)] outline-none" />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Área de Interés (Opcional)</label>
                  <select value={interestArea} onChange={e => setInterestArea(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-primary)] outline-none">
                    <option value="">Selecciona un área</option>
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <button onClick={() => setStudentStep(3)} disabled={!goal || (goal === 'target_company' && !targetCompany)} className="mt-10 w-full bg-[var(--color-brand-primary)] text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all">
                  Siguiente Paso <FiChevronRight />
                </button>
              </div>
            )}

            {studentStep === 3 && (
              <div className="animate-slideUp">
                <h2 className="text-3xl font-bold text-[var(--color-brand-text)] mb-2">Tu Experiencia</h2>
                <p className="text-[var(--color-brand-subtext)] mb-8">No te preocupes si recién empiezas, te guiaremos paso a paso.</p>

                <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-3">¿Tienes alguna experiencia previa?</label>
                <div className="flex gap-4 mb-6">
                  <button onClick={() => setHasExperience(true)} className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${hasExperience === true ? 'border-[var(--color-brand-primary)] bg-blue-50 text-[var(--color-brand-primary)]' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}>Sí, tengo</button>
                  <button onClick={() => { setHasExperience(false); setExperienceType(""); }} className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${hasExperience === false ? 'border-[var(--color-brand-primary)] bg-blue-50 text-[var(--color-brand-primary)]' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}>Aún no</button>
                </div>

                {hasExperience && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 animate-fadeIn">
                    {EXP_TYPES.map(exp => (
                      <button key={exp.id} onClick={() => setExperienceType(exp.id)} className={`text-left p-3 rounded-xl border-2 transition-all ${experienceType === exp.id ? 'border-[var(--color-brand-primary)] bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}>
                        <div className="font-bold text-sm text-[var(--color-brand-text)]">{exp.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-3 mt-8">¿Tienes proyectos personales o académicos?</label>
                <div className="flex gap-4 mb-10">
                  <button onClick={() => setHasProjects(true)} className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${hasProjects === true ? 'border-[var(--color-brand-primary)] bg-blue-50 text-[var(--color-brand-primary)]' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}>Sí, tengo proyectos</button>
                  <button onClick={() => setHasProjects(false)} className={`flex-1 p-4 rounded-xl border-2 font-bold transition-all ${hasProjects === false ? 'border-[var(--color-brand-primary)] bg-blue-50 text-[var(--color-brand-primary)]' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}>Aún no</button>
                </div>

                <button onClick={submitStudent} disabled={hasExperience === null || hasProjects === null || loading || (hasExperience && !experienceType)} className="w-full bg-[var(--color-brand-primary)] text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all">
                  {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiCheck size={20} /> Generar mi Ruta</>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (role === "recruiter") {
    return (
      <div className="min-h-screen w-full bg-[var(--color-brand-bg)] flex flex-col justify-center py-12 px-6">
        <div className="max-w-lg w-full mx-auto bg-white p-10 rounded-3xl shadow-xl">
          <button onClick={() => recruiterStep === 1 ? setRole(null) : setRecruiterStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <FiArrowLeft /> Volver
          </button>

          {recruiterStep === 1 ? (
            <div className="animate-slideUp">
              <h2 className="text-3xl font-bold text-[var(--color-brand-text)] mb-2">Verificación de Empresa</h2>
              <p className="text-[var(--color-brand-subtext)] mb-8">Necesitamos verificar tu identidad corporativa para darte acceso a los perfiles.</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Nombre de la Empresa</label>
                  <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-accent)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Cargo (Opcional)</label>
                  <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-accent)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--color-brand-text)] mb-2">Correo Corporativo</label>
                  <input type="email" value={corporateEmail} onChange={e => setCorporateEmail(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-[var(--color-brand-accent)] outline-none" />
                </div>
              </div>

              <button onClick={submitRecruiterCode} disabled={!companyName || !corporateEmail || loading} className="mt-10 w-full bg-[var(--color-brand-accent)] text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all">
                {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiSend size={20} /> Enviar Código de Verificación</>}
              </button>
            </div>
          ) : (
            <div className="animate-slideUp text-center pt-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSend size={32} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-[var(--color-brand-text)] mb-2">Revisa tu Correo</h2>
              <p className="text-[var(--color-brand-subtext)] mb-8">Hemos enviado un código de 6 dígitos a <br /><span className="font-bold text-[var(--color-brand-text)]">{corporateEmail}</span></p>

              <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="XXXXXX" maxLength={6} className="w-full p-4 bg-gray-50 border-2 border-dashed border-[var(--color-brand-accent)] rounded-xl text-center text-3xl font-bold tracking-[0.5em] mb-8 outline-none" />

              <button onClick={verifyRecruiter} disabled={code.length < 6 || loading} className="w-full bg-[var(--color-brand-primary)] text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[var(--color-brand-hover)] disabled:opacity-50 transition-all">
                {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiCheck size={20} /> Verificar y Entrar</>}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
